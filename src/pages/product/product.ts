import { Component } from '@angular/core';
import { App, NavController, NavParams, ModalController } from 'ionic-angular';
import { SettingsPage } from '../settings/settings';
import { ChatroomPage } from '../chatroom/chatroom';
import { Products, Conversations } from '../../providers/providers';
import { Product } from '../../models/product'


@Component({
  selector: 'page-product',
  templateUrl: 'product.html'
})
export class ProductPage {

  productList;

  constructor(public navCtrl: NavController,
    private modalCtrl: ModalController,
    private products: Products,
    private conversations:Conversations, private app: App) {
  }

  ionViewDidLoad() {
    this.products.getProducts().then(results => {
      this.productList = results;
    })
  }

  openSettings() {
    this.presentSettingsModal();
  }

  presentSettingsModal() {
    let settingsModal = this.modalCtrl.create(SettingsPage);
    settingsModal.present();
  }


  openChatroom (conversation, product: Product) {
    console.log(conversation);
    this.app.getRootNav().push(ChatroomPage, {conversation: conversation, product: product });

  }

  message(userID, product: Product) {
    console.log(); //
    // if no existing conversation with user => create
    this.conversations.createConversation(userID).then(conversation => {
      this.openChatroom(conversation, product);


      // nevigation to conversation
    }).catch(error=> {
      console.log(error);

      // if have conversation => direct to conversation
      if (error.error.code == 108) {
        // That means: Conversation with the participants already exists
        var conversationID = error.error.info.conversation_id;
        console.log(conversationID);

        var conversation = this.conversations.getConversationByID(conversationID);
        this.openChatroom(conversation, product);
      }
    });

  }

}
