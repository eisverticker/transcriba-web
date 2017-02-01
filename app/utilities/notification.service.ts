import { Subject } from 'rxjs/Rx';

import { Notification } from './notification';

export class NotificationService {
  private subject: Subject<Notification> = new Subject<Notification>();
  public messages = this.subject.asObservable();

  public notify(data: Notification) {
    this.subject.next( data );
  }

}
