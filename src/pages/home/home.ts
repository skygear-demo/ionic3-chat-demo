import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { SettingsPage } from '../settings/settings';
import { Conversations } from '../../providers/providers';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  myConversations;

  constructor(public navCtrl: NavController,
    public modalCtrl:ModalController,
    private conversations:Conversations) {
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

}
