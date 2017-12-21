import { Component } from '@angular/core';
import { NavController, ViewController } from 'ionic-angular';
import { User } from '../../providers/providers'
import { AuthPage } from '../auth/auth';

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {

  constructor(public navCtrl: NavController,
    public viewCtrl: ViewController,
    private user: User) {
  }

  username:string;

  ionViewWillEnter() {
    this.user.getCurrentUser().then(currentUser => {
      if (currentUser) {
        this.user.getUserProfile(currentUser["_id"]).then(userprofile => {
          this.username = userprofile["name"];
        });
      }
    });
  }

  logout() {
    this.user.signoutSkygear().then(user => {
      console.log("OK");
      this.navCtrl.setRoot(AuthPage);
      this.navCtrl.popToRoot();
      
      // this.viewCtrl.dismiss();
    }).catch(error => {
      console.log('Not OK', error);
    });
  }

  close() {
    this.viewCtrl.dismiss();
  }

}
