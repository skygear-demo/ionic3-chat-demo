/* Conversations - for all chat operations */

import 'rxjs/add/operator/toPromise';
import { Injectable } from '@angular/core';
import { Message } from '../../models/message';
import { User } from '../user/user';

import {
  SkygearService, SkygearConversation
} from '../../app/skygear.service';


@Injectable()
export class Conversations {
  conversations;

  constructor(
    private skygearService: SkygearService,
    private user: User) {
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
    return new SkygearConversation({'_id': 'conversation/'+conversationID});
  }

  fetchConversation(conversation) {
    return new Promise((resolve, reject) => {
      console.log('Fetching conversation');
      this.skygearService.getSkygearChat().then(skygearchat => {
        // this API requires id in format without type of "type/id"
        skygearchat.getConversation(conversation._id, true).then((result) => { 
          resolve(result);
        }).catch((error) => {
          reject(error);
        });
      });
    });
  }

  getConversationTitle(conversation) {
    return new Promise((resolve, reject) => {
      this.user.getCurrentUser().then(user => {
        var userId = user["_id"];

        console.log("userId", userId);
        console.log("conversation.participant_ids", conversation.participant_ids);


        // Assume only one user
        var anotherUserId;

        for (var i in conversation.participant_ids) {
          var participantId = conversation.participant_ids[i];
          if (participantId !== userId) {
            anotherUserId = participantId;
          }
        }
        
        this.user.getUserProfile(anotherUserId).then(user=> {
          console.log('user as title');
          console.log(user);
          resolve(user.username);
        }).catch(error=> {
          console.error(error);
          reject(error);
        });

      });
    });
  }

  convertMessage(msg) {
    var message = new Message({});
    message.message = msg.body;
    if (msg.attachment) {
      message.attachment = msg.attachment;
    }
    if (msg.metadata) {
      message.metadata = msg.metadata;
    }
    message.time = msg.createdAt;
    message.id = msg._id;
    message.sender = msg.ownerID;
    message.skygearRecord = msg;

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
            var parsedMessages = _me.parseMessages(messages);
            resolve(parsedMessages);
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

  /* Realtime update */
  subscribeOneConversation(conversation, handler) {
    return new Promise((resolve, reject)=> {
      this.skygearService.getSkygearChat().then(skygearchat => {
        var h = (update)=> {
          if (update.record && conversation.id == update.record.conversation.id) {
            handler(update);
          }
        }
        skygearchat.subscribe(h);

        resolve(h);
      });
    });
  }

  unsubscribeConversation(handler) {
    return new Promise((resolve, reject) => {
      let h = handler;
      this.skygearService.getSkygearChat().then(skygearchat => {
        skygearchat.unsubscribe(h);
      });
    });
  }

  getUnreadCount() {
    return new Promise((resolve, reject) => {
      this.skygearService.getSkygearChat().then(skygearchat => {
        skygearchat.getUnreadCount().then(result => {
          resolve(result);
        }).catch(error => {
          reject(error);
        });
      });
    });
  }

  markAsLastMessageRead(conversation, message) {
    return new Promise((resolve, reject) => {
      this.skygearService.getSkygearChat().then(skygearchat => {
          skygearchat.markAsLastMessageRead(conversation, message).then(result=>{
            resolve(result);
          }).catch(error => {
            reject(error);
          })
        });
    });
  }

  markAsRead(messages) {
    return new Promise((resolve, reject) => {
      this.skygearService.getSkygearChat().then(skygearchat => {
          skygearchat.markAsRead(messages).then(result=>{
            resolve(result);
          }).catch(error => {
            reject(error);
          })
        });
    });
  }

}
