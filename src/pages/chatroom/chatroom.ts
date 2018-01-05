import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Content, TextInput } from 'ionic-angular';
import { Conversations, User } from '../../providers/providers';


@Component({
  selector: 'page-chatroom',
  templateUrl: 'chatroom.html'
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
    public user: User) {
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
    this.conversations.addMessageInConversation(this.conversation.skygearRecord, message, {}, "").then(result => {
      // this.pushNewMsg(result); // Pushing a message will be handled in subscribeMessageUpdate();
    });
  }

  pushNewMsg(msg) {
    this.msgList.push(msg);
    this.scrollToBottom();

    return msg;
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
