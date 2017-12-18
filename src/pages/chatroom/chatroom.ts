import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { IonicPage } from 'ionic-angular';
import { Events, Content, TextInput } from 'ionic-angular';
import { Products, Conversations, Messages, User } from '../../providers/providers';

@Component({
  selector: 'page-chatroom',
  templateUrl: 'chatroom.html'
})
export class ChatroomPage {
  conversation;
  productContext;
  title = '';
  editorMsg = '';

  @ViewChild(Content) content: Content;
  @ViewChild('chat_input') messageInput: TextInput;

  showEmojiPicker = false;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public conversations: Conversations,
    public messages: Messages,
    public user: User) {

      this.conversation = navParams.get('conversation');
      this.productContext = navParams.get('product');
      this.title = this.conversation.title;
      this.initThumbnail();
  }

  ionViewDidLoad() {
    console.log('chatroom loaded');
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
    this.showEmojiPicker = false;
    this.content.resize();
    this.scrollToBottom();
  }

  switchEmojiPicker() {
    this.showEmojiPicker = !this.showEmojiPicker;
    if (!this.showEmojiPicker) {
      this.messageInput.setFocus();
    }
    this.content.resize();
    this.scrollToBottom();

  }

  /* Message send / receive */
  sendMsg() {
    if (!this.editorMsg.trim()) return;
  }

  pushNewMsg(msg) {

  }

  scrollToBottom() {
      setTimeout(() => {
          if (this.content.scrollToBottom) {
              this.content.scrollToBottom();
          }
      }, 400);
  }

}
