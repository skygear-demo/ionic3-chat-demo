import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Content, TextInput } from 'ionic-angular';
import { Conversations, User } from '../../providers/providers';
import { ImagePicker } from '@ionic-native/image-picker';
import skygear from 'skygear';
import { File } from '@ionic-native/file';
import { PhotoViewer } from '@ionic-native/photo-viewer';


@Component({
  selector: 'page-chatroom',
  templateUrl: 'chatroom.html',
  providers: [ImagePicker, File, PhotoViewer]
})
export class ChatroomPage {
  conversation;
  productContext;
  title = '';
  editorMsg = '';
  msgList;

  //You may also store the user object here for easier info access
  userId: string;
  toUserId: string;

  handler;

  @ViewChild(Content) content: Content;
  @ViewChild('chat_input') messageInput: TextInput;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public conversations: Conversations,
    public user: User,
    private imagePicker: ImagePicker,
    private file: File,
    private photoViewer: PhotoViewer) {
      this.conversation = navParams.get('conversation');
      this.productContext = navParams.get('product');
      this.title = this.conversation.title;
      this.initThumbnail();

      this.user.getCurrentUser().then(user => {
        this.userId = user["_id"];

        console.log("userId", this.userId);
        console.log("this.conversation.participant_ids", this.conversation.participant_ids);
      });
  }

  ionViewDidLoad() {
    console.log('chatroom loaded');
    if (!this.conversation) {return;}

    this.conversations.getMessages(this.conversation.skygearRecord).then((result) => {
      this.msgList = result;
      this.scrollToBottom();
      this.subscribeMessageUpdate();
    }).catch((error) => {
      console.log("My error:",error);
      alert("Couldn't load messages :( ");
    });
  }

  ionViewDidEnter() {
    // After getting messages
    this.scrollToBottom();
  }

  ionViewWillLeave () {
    this.unsubscribeMessageUpdate();
  }

  initThumbnail() {
    console.log(this.conversation);
    this.conversations.fetchConversation(this.conversation.skygearRecord._id).then(result => {
      console.log(result);
      this.conversation.skygearRecord = result;
      var firstParticipant = this.conversation.participant_ids[0]; // And not myself

      this.user.getUserProfile(firstParticipant).then(participant => {
        console.log(participant);
      });

    }).catch(error => {
      console.log(error);
    });
  }

  /* Chat input control */
  onFocus() {
    this.content.resize();
    this.scrollToBottom();
  }

  /* Message send / receive */
  sendMsg() {
    if (!this.editorMsg.trim()) return;
    let message = this.editorMsg;

    // TODO: You can add pending state here
    this.editorMsg = '';
    this.conversations.addMessageInConversation(this.conversation.skygearRecord, message, {}, "");
  }

  pushNewMsg(msg) {
    this.msgList.push(msg);
    this.scrollToBottom();

    return msg;
  }

  resizeImage(base64String, maxSize, callback) {
    const canvas = document.createElement('canvas');
    const image = new Image();
    image.onload = function() {
      const ctx = canvas.getContext("2d");
      const size = Math.max(image.width, image.height);
      const ratio = Math.min(1.0, maxSize / size);
      canvas.width = image.width * ratio;
      canvas.height = image.height * ratio;
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
      callback(canvas.toDataURL(), canvas.width, canvas.height);
    }
    image.src = base64String;
  }

  sendAttachment() {
    this.imagePicker.getPictures({}).then((results) => {
      this.resizeImage(results[0], 1600.0, (newImage, newWidth, newHeight) => {
        this.resizeImage(results[0], 80.0, (thumbnail, thumbnailWidth, thumbnailHeight) => {
          let base64File = newImage.replace(/^data:image\/(png|jpeg|jpg);base64,/, '')
          const skyAsset = new skygear.Asset({
                base64: base64File,
                name: "image.png",
                contentType: "image/png"
              });
          const meta = {'thumbnail': thumbnail, 'width': thumbnailWidth, 'height': thumbnailHeight};
          this.conversations.addMessageInConversation(this.conversation.skygearRecord, '', meta, skyAsset).catch(e => console.log(e));
        });
      });
    }).catch(e => console.log(e));
  }

  showImage(url) {
    this.photoViewer.show(url);
  }

  onLoadImage(evt, url) {
    if (evt.target.src != url) {
      evt.target.src = url;
    }
  }

  scrollToBottom() {
    setTimeout(() => {
        if (this.content) {
            this.content.scrollToBottom();
        }
    }, 400);
  }


// TODO: Fix me
  h;

  subscribeMessageUpdate() {
    this.conversations.subscribeOneConversation(this.conversation.skygearRecord, (update) => {
    console.log('update', update);
    if (update.event_type == "create") {
      this.pushNewMsg(this.conversations.convertMessage(update.record));
    } else if (update.event_type == "update"){
      // handle message update here
    }
  }).then(h => {
      this.h = h;
    });
  }

  unsubscribeMessageUpdate() {
    if (this.h) {
      this.conversations.unsubscribeConversation(this.h);
    }

  }

}
