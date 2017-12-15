import { Injectable } from '@angular/core';
import skygear from 'skygear';

@Injectable()
export class SkygearService {
  isConfigurated = false;
  getSkygear() {
    if (this.isConfigurated) {
      console.log("Configed");
      return Promise.resolve(skygear);
    }
    console.log("Create Config");
    let promise = skygear.config({
      'endPoint': 'https://ionicmessenger.skygeario.com/',
      'apiKey': 'fd3d2d1b141345d6aa0212c3ba715206',
    }).then(()=> {
      this.isConfigurated = true
      return Promise.resolve(skygear);
    })

    return promise;
  }
}



export const SkygearTracking = skygear.Record.extend('Tracking');
export const SkygearItem = skygear.Record.extend('Item');