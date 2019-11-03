import { Component, EventEmitter, Output } from '@angular/core';

import { User } from './user';
import { AuthService } from './auth.service';
import { NotificationService } from '../utilities/notification.service';
import { Notification } from '../utilities/notification';

@Component({
  moduleId:     module.id,
  selector:    'usr-login',
  templateUrl: 'login-form.component.html',
  styleUrls: []
})
export class LoginFormComponent {

  @Output() done: EventEmitter<any> = new EventEmitter();

  public user: User = User.createEmptyUser();
  public isLoggingIn = false;
  public isLastLoginFailed = false;

  constructor(
    private auth: AuthService,
    private notify: NotificationService
  ) {}

  login() {
    this.isLoggingIn = true;

    this.auth.login(this.user).then(
      (data) => {
        this.notify.notify(new Notification('message.welcome', ['success']));
        this.done.emit(data);
        this.isLoggingIn = false;
      }
    , (err) => {
        if (err === 'Timeout') {
          this.notify.notify(Notification.timeout());
        }
        this.isLastLoginFailed = true;
        this.isLoggingIn = false;
      }
    );
  }

}
