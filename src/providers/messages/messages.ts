import 'rxjs/add/operator/toPromise';
import { Injectable } from '@angular/core';
import { Message } from '../../models/MEssage';

import {
  SkygearService, SkygearConversation, SkygearMessage
} from '../../app/skygear.service';


@Injectable()
export class Messages {
  messages;

  constructor(
    private skygearService: SkygearService) { 
  }

}