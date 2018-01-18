import { Injectable } from '@angular/core';
import skygear from 'skygear';
import skygearchat from 'skygear-chat';

@Injectable()
export class SkygearService {
  isConfigurated = false;
  currentUser;
  
  configSkygear() {
    return new Promise((resolve) => {
      skygear.config({
        'endPoint': 'https://ionicmessenger.skygeario.com/',
        'apiKey': 'fd3d2d1b141345d6aa0212c3ba715206',
      }).then(()=> {
        this.isConfigurated = true
        console.log("Skygear Ready");
        resolve(skygear);
      });
    });
  }

  getSkygear() {
    if (this.isConfigurated) {
      this.currentUser = skygear.currentUser;
      return Promise.resolve(skygear);
    }
    let promise = this.configSkygear();
    return promise;
  }

  getSkygearChat() {
    if (this.isConfigurated) {
      console.log("Configed");
      skygearchat.skygear = skygear;

      return Promise.resolve(skygearchat);
    } else {
      let promise = new Promise(resolve => {
        this.configSkygear().then(skygear => {
          skygearchat.skygear = skygear; 
          resolve(skygearchat);
        });
      });
      return promise;
    }
  }
}

export const SkygearConversation = skygear.Record.extend('conversation');
export const SkygearMessage = skygear.Record.extend('message');