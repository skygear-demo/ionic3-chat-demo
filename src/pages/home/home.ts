import { Component } from '@angular/core';
import { App, NavController, ModalController } from 'ionic-angular';
import { SettingsPage } from '../settings/settings';
import { ChatroomPage } from '../chatroom/chatroom';
import { Conversations } from '../../providers/providers';
import { Conversation } from '../../models/conversation'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  myConversations;

  constructor(public navCtrl: NavController,
    public modalCtrl: ModalController,
    private conversations: Conversations,
    private app: App) {
    this.loadConversations();
  }

  openSettings() {
    this.presentSettingsModal();
  }

  presentSettingsModal() {
    let settingsModal = this.modalCtrl.create(SettingsPage);
    settingsModal.present();
  }

  openConversation(conversation) {
    this.app.getRootNav().push(ChatroomPage, {conversation: conversation});
  }

  loadConversations() {
    this.conversations.getConversationList().then((conversations) => {
      
      this.myConversations = [];

      conversations.forEach((skygearConversation) => {
        this.conversations.getConversationTitle(skygearConversation).then(title => {
          var mConversation = new Conversation();
          mConversation.setFields(skygearConversation);
          mConversation["title"] = title;
          this.myConversations.push(mConversation);
        });
      })
    }).catch(error => {
      console.log(error);
      console.log("Couldn't load conversations");
    });
  }

}
