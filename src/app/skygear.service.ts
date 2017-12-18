import { Injectable } from '@angular/core';
import skygear from 'skygear';
import skygearchat from 'skygear-chat';

@Injectable()
export class SkygearService {
  isConfigurated = false;
  
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
      console.log("Configed");
      return Promise.resolve(skygear);
    }
    console.log("Create Config");
    let promise = this.configSkygear();
    return promise;
  }

  getSkygearChat() {
    if (this.isConfigurated) {
      console.log("Configed");
      console.log(skygearchat);
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


export const SkygearConversation = skygear.Record.extend('Conversation');
export const SkygearMessage = skygear.Record.extend('Message');