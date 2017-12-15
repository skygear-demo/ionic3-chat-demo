import 'rxjs/add/operator/toPromise';
import { Injectable } from '@angular/core';

import {
  SkygearService
} from '../../app/skygear.service';


@Injectable()
export class User {

  constructor(
    private skygearService: SkygearService) { 
  }

  getCurrentUser() {
    var skygearPromise = new Promise((resolve, reject) => {
    this.skygearService.getSkygear()
      .then((skygear) => {
        console.log(`Skygear OK`);
        resolve(skygear.auth.currentUser);
      })
      .catch((error) => {
        console.log(`Skygear Error`);
        reject(error);
      });

    });
     return skygearPromise;
  }

  signupSkygear(username, password) {
    var skygearPromise = new Promise((resolve, reject) => {
      this.skygearService.getSkygear()
        .then((skygear) => {
          console.log(`Skygear OK`);
          skygear.auth.signupWithUsername(username, password).then((user)=> {
            console.log(user);
            resolve(user);
          }).catch(error => {
            console.log(`Skygear Signup Error`);
            console.error(error);
            reject(error);
          });
        })
        .catch((error) => {
          console.log(`Skygear Error`);
          console.error(error);
          reject(error);
        });
      });
      return skygearPromise;
  }

  signinSkygear(username, password) {
    var skygearPromise = new Promise((resolve, reject) => {
      this.skygearService.getSkygear()
        .then((skygear) => {
          console.log(`Skygear OK`);
          skygear.auth.loginWithUsername(username, password).then((user)=> {
            console.log(user);
            resolve(user);
          }).catch(error => {
            console.log(`Skygear Signup Error`);
            console.error(error);
            reject(error);
          });
        })
        .catch((error) => {
          console.log(`Skygear Error`);
          console.error(error);
          reject(error);
        });
      });
      return skygearPromise;
  }

  signoutSkygear() {
    var skygearPromise = new Promise((resolve, reject) => {
      this.skygearService.getSkygear()
        .then((skygear) => {
          console.log(`Skygear OK`);
          skygear.auth.logout().then((user)=> {
            console.log(user);
            resolve(user);
          });
        })
        .catch((error) => {
          console.log(`Skygear Error`);
          console.error(error);
          reject(error);
        });
      });
      return skygearPromise;
  }


}