import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { IonicPage } from 'ionic-angular';
import { Events, Content, TextInput } from 'ionic-angular';
import { Products, Conversations, User } from '../../providers/providers';

import { Message } from '../../models/message';

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

    this.conversations.getMessages(this.conversation).then((result) => {
      this.msgList = result;
      this.scrollToBottom();

    }).catch((error) => {
      console.log("My error:",error);
      alert("Couldn't load messages :( ");
    });
  }

  ionViewDidEnter() {
    // After getting messages
    this.scrollToBottom();
  }

  initThumbnail() {
    console.log(this.conversation);
    this.conversations.fetchConversation(this.conversation._id).then(result => {
      console.log(result);
      this.conversation = result;
      this.title = this.conversation.title;
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
    this.conversations.addMessageInConversation(this.conversation, message, {}, null).then(result => {
      this.pushNewMsg(result);
    });
  }

  pushNewMsg(msg) {
    this.msgList.push(msg);
    this.scrollToBottom();

    return msg;
  }

  scrollToBottom() {
      setTimeout(() => {
          if (this.content.scrollToBottom) {
              this.content.scrollToBottom();
          }
      }, 400);
  }

}
