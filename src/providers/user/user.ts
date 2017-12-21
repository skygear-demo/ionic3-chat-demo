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
          skygear.auth.logout().then((user)=> {
            console.log(user);
            resolve(user);
          });
        })
        .catch((error) => {
          console.error(error);
          reject(error);
        });
      });
      return skygearPromise;
  }

  // General user helper

  getUserProfile(userId) {
    return new Promise((resolve, reject) => {
      this.skygearService.getSkygear().then(skygear => {
        const query = new skygear.Query(skygear.UserRecord);
        query.equalTo('_id', userId);
        skygear.publicDB.query(query).then((records) => {
          const record = records[0];
          console.log(record);
          resolve(record);
        }, (error) => {
          console.error(error);
          reject(error);
        });
      });
    });
  }


}