import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { SettingsPage } from '../settings/settings';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController,
    public modalCtrl:ModalController) {

  }

  openSettings() {
    this.presentSettingsModal();
  }

  presentSettingsModal() {
    let settingsModal = this.modalCtrl.create(SettingsPage);
    settingsModal.present();
  }

}
