import { Component } from '@angular/core';
import { App, NavController, ModalController } from 'ionic-angular';
import { SettingsPage } from '../settings/settings';
import { ChatroomPage } from '../chatroom/chatroom';
import { Conversations } from '../../providers/providers';

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
    this.conversations.getConversationList().then((conversations) => {
      this.myConversations = conversations;
    }).catch(error => {
      console.log("Couldn't load conversations");
    });
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

}
