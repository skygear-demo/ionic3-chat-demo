import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { User } from '../../providers/providers'

import { TabsPage } from '../tabs/tabs';

@Component({
  selector: 'page-auth',
  templateUrl: 'auth.html'
})
export class AuthPage {
  username:string;
  password:string;

  mode:string = 'signin'; // signin / signup

  constructor(public navCtrl: NavController,
    private user: User) {
  }

  login() {
    console.log(this.username, this.password);
    this.user.signinSkygear(this.username, this.password).then(user => {
      console.log("OK");
      this.navCtrl.setRoot(TabsPage);
      this.navCtrl.popToRoot();
    }).catch(error => {
      console.log('Not OK', error);
    });
  }

  signup() {
    console.log(this.username, this.password);
    this.user.signupSkygear(this.username, this.password).then(user => {
      console.log("OK");
      this.navCtrl.setRoot(TabsPage);
      this.navCtrl.popToRoot();
    }).catch(error => {
      console.log('Not OK', error);
    });
  }

  switchToSignup() {
    this.mode = 'signup';
  }

  switchToSignin() {
    this.mode = 'signin';
  }

}
