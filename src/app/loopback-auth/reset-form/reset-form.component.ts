import { Component, EventEmitter, Output } from '@angular/core';

import { AuthService } from '../auth.service';
import { User } from '../user';

import { NotificationService } from '../../utility/notification.service';
import { Notification } from '../../utility/notification';

@Component({
  selector: 'lauth-reset-form',
  templateUrl: './reset-form.component.html',
  styleUrls: ['./reset-form.component.scss']
})
export class ResetFormComponent {
  @Output() done: EventEmitter<any> = new EventEmitter();

  public user: User = User.createEmptyUser(); // ()
  public isResetting = false; // ()
  public isLastResetFailed = false; // ()

  constructor(
    private auth: AuthService,
    private notify: NotificationService
  ) {}

  reset() {
    this.isResetting = true;
    this.auth.resetPassword(this.user).then(
      () => {
        this.isResetting = false;
        this.notify.notify(Notification.message('message.emailSent'));
        this.done.emit(null);
      },
      () => {
        this.isLastResetFailed = true;
        this.isResetting = false;
      }
    );
  }

}
