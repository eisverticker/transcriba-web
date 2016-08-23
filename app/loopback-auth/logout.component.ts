import { Component, OnInit, EventEmitter, Output } from '@angular/core';

import { User } from './user';
import { AuthService } from './auth.service';
import { NotificationService } from '../utilities/notification.service';
import { Notification } from '../utilities/notification';

@Component({
  moduleId:     module.id,
  selector:    'user-logout',
  templateUrl: 'logout.component.html',
  styleUrls: [],
  directives: [],
  providers: []
})
export class LogoutComponent implements OnInit{
  @Output() done: EventEmitter<any> = new EventEmitter();

  public user: User = new User("","","");
  public isLoggingOut: boolean = false;

  constructor(
    private auth: AuthService,
    private notify: NotificationService
  ){}

  ngOnInit(){
    this.user = this.auth.getActiveUser();
  }

  public doLogout(){
    this.isLoggingOut = true;

    this.auth.logout().then(
      () => {
        this.notify.notify(new Notification('message.goodbye', ['info']));
        this.isLoggingOut = false;
        this.done.emit(null);
      },
      (err) => {
        this.isLoggingOut = true;
        if(err == "Timeout"){
          this.notify.notify(Notification.timeout());
        }else{
          this.notify.notify(
            Notification.message('request.logoutFailed')
          );
        }
      }
    );
  }

}
