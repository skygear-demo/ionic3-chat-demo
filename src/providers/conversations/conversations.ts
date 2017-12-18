import 'rxjs/add/operator/toPromise';
import { Injectable } from '@angular/core';
import { Conversation } from '../../models/conversation';


import {
  SkygearService
} from '../../app/skygear.service';


@Injectable()
export class Conversations {
  conversations;

  constructor(
    private skygearService: SkygearService) { 
  }

  getConversationList() {
    return new Promise((resolve,reject) => {
      console.log('getting conversation list');
      this.skygearService.getSkygearChat().then(skygearchat => {
        console.log('skygearchat', skygearchat);
        skygearchat.getConversations().then(conversations => {
          console.log('conversations', conversations);
          this.conversations = conversations;
          resolve(conversations);
        }).catch(error => {
          reject(error);
        })
      });
    });
  }
}