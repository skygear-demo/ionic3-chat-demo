import 'rxjs/add/operator/toPromise';
import { Injectable } from '@angular/core';
import { Conversation } from '../../models/conversation';

import {
  SkygearService, SkygearConversation
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

  createConversation(userID) {
    return new Promise((resolve,reject) => {

      console.log('creating conversation');
      this.skygearService.getSkygearChat().then(skygearchat => {
        console.log(skygearchat);
        console.log(skygearchat.skygear);

        var skygear = skygearchat.skygear;
        var targetUser = new skygear.UserRecord({
          '_id': 'user/' + userID
        });

        skygearchat.createDirectConversation(targetUser,'Title').then(conversation => {
          resolve(conversation);
        }).catch(error => {
          reject(error);
        })
      });
    });
  }

  getConversationByID(conversationID) {
    return new SkygearConversation({'_id': 'Conversation/'+conversationID});
  }

  fetchConversation(conversation) {
    return new Promise((resolve, reject) => {
      console.log('creating conversation');
      this.skygearService.getSkygearChat().then(skygearchat => {
        // this API requires id in format without type of "type/id"
        skygearchat.getConversation(conversation, true).then((result) => { 
          resolve(result);
        }).catch((error) => {
          reject(error);
        });
      });
    });
  }

}