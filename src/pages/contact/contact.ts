import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { SettingsPage } from '../settings/settings';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  constructor(public navCtrl: NavController,
    private modalCtrl: ModalController) {
  }

  join() {
    console.log('Join group!');
  }

  openSettings() {
    this.presentSettingsModal();
  }

  presentSettingsModal() {
    let settingsModal = this.modalCtrl.create(SettingsPage);
    settingsModal.present();
  }

}
