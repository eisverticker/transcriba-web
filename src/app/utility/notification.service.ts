import { Injectable } from '@angular/core';

import { Subject, Observable } from 'rxjs/Rx';
import { Notification } from './notification';

@Injectable()
export class NotificationService {
  private subject: Subject<Notification>;
  public messages: Observable<Notification>;

  constructor() {
    this.subject = new Subject<Notification>();
    this.messages = this.subject.asObservable();
  }

  public notify(data: Notification) {
    console.log("notify activated");
    this.subject.next( data );
  }

}
