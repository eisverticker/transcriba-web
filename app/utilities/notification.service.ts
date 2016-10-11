import { Observable, Subject } from 'rxjs/Rx';

import { Notification } from './notification';

export class NotificationService{
  private subject:Subject<Notification> = new Subject<Notification>();
  public messages = this.subject.asObservable();

  constructor(){
    //console.log("Notification Service created");
  }

  public notify(data: Notification){
    this.subject.next( data );
  }

}
