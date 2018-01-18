import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { ProductPage } from '../product/product';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { AuthPage } from '../auth/auth';
import { Conversations, User } from '../../providers/providers'

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  productListRoot = ProductPage;
  directChatListRoot = HomePage;
  groupChatListRoot = ContactPage;
  messageNotificationCount = 0;

  constructor(public navCtrl: NavController,
   private user: User,
   private conversations: Conversations) {
  }

  ionViewWillEnter() {
    this.user.getCurrentUser().then(result=>{
      if(result) {
        this.getUnreadCount();
      }
    });
  }

  ionViewDidLoad() {
    this.user.getCurrentUser().then(result=>{
      if (!result) {
        this.navCtrl.setRoot(AuthPage);
        this.navCtrl.popToRoot();
        console.log('Not logged in');
      } else {
        console.log('Logged in as ', result);
      }
    }).catch(error=> {
      this.navCtrl.setRoot(AuthPage);
      this.navCtrl.popToRoot();
      console.log(error);
    });


  }

  getUnreadCount() {
    this.messageNotificationCount = null;

    this.conversations.getUnreadCount().then(result => {
      this.messageNotificationCount = result["message"];
    });
  }
}
