import { Component, OnInit, EventEmitter, Output } from '@angular/core';

import { AuthService } from './auth.service';
import { User } from './user';

import { NotificationService } from '../utilities/notification.service';
import { Notification } from '../utilities/notification';

@Component({
  moduleId:     module.id,
  selector:    'password-reset',
  templateUrl: 'reset-form.component.html',
  styleUrls: []
})
export class ResetFormComponent implements OnInit{
  @Output() done: EventEmitter<any> = new EventEmitter();

  public user: User = User.createEmptyUser();//()
  public isResetting: boolean = false;//()
  public isLastResetFailed: boolean = false;//()

  constructor(
    private auth: AuthService,
    private notify: NotificationService
  ){

  }

  ngOnInit(){

  }

  reset(){
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
