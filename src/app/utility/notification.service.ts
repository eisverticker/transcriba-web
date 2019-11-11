import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
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
    this.subject.next( data );
  }

}
