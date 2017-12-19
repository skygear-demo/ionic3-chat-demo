/* Conversations - for all chat operations */

import 'rxjs/add/operator/toPromise';
import { Injectable } from '@angular/core';
import { Conversation } from '../../models/conversation';
import { Message } from '../../models/message';

import {
  SkygearService, SkygearConversation
} from '../../app/skygear.service';


@Injectable()
export class Conversations {
  conversations;

  constructor(
    private skygearService: SkygearService) { 
  }

  /* Conversations */

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

  convertMessage(msg) {
    var message = new Message({});
    message.message = msg.body;
    message.time = msg.createdAt;
    message.id = msg._id;
    message.sender = msg.ownerID;

    return message;
  }

  /* Messages */
  parseMessages(messages) {
    var result = [];
    for (var i in messages) {
      var message = this.convertMessage(messages[i])
      
      if(!messages[i].deleted) {
        result.unshift(message);
      }
    }
    return result;
  }

  getMessages(conversation) { 
    let _me = this;
    return new Promise((resolve, reject) => {
      this.skygearService.getSkygearChat().then(skygearchat => {

        const LIMIT = 999;
        const currentTime = new Date();
        skygearchat.getMessages(conversation, LIMIT, currentTime)
          .then(function (messages) {
            let lastMsgTime;
            messages.forEach(function (m) {

              console.log("messages", m);
              // const liNode = document.createElement('LI');
              // liNode.appendChild(document.createTextNode(m.content));
              // ulNode.appendChild(liNode);
              // lastMsgTime = m.createAt;

            });
            console.log(_me);
            var parsedMessages = _me.parseMessages(messages);
            resolve(parsedMessages);
            // Querying next page
            // skygearChat.getMessages(conversation, 10, lastMsgTime).then();
          }, function (error) {
            console.log('Error: ', error);
            reject(error);
          });


      });
    });
  }

  addMessageInConversation(conversation, message, arg, file) {
    let _me = this;
    return new Promise((resolve, reject) => {
      this.skygearService.getSkygearChat().then(skygearchat => {
        skygearchat.createMessage(
          conversation,
          message,
          arg,
          file
        ).then(function (result) {
          console.log('Save success', result);
          resolve(_me.convertMessage(result));
        }).catch((error)=> {
          console.log('Error', error);
          reject(error);
        });
      });
    });
  }

}