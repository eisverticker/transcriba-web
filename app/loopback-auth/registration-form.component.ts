import { Component, OnInit, EventEmitter, Output } from '@angular/core';

import { AuthService } from './auth.service';
import { User } from './user';

import { NotificationService } from '../utilities/notification.service';
import { Notification } from '../utilities/notification';

@Component({
  moduleId:     module.id,
  selector:    'user-registration',
  templateUrl: 'registration-form.component.html',
  styleUrls: [],
  providers: []
})
export class RegistrationFormComponent implements OnInit{
  @Output() done: EventEmitter<any> = new EventEmitter();

  public user: User = User.createEmptyUser();//()
  public isRegistering: boolean = false;//()
  public isLastRegistrationFailed: boolean = false;//()
  public passwordCheck: string = "";
  //is true if both password field values match
  // except they are empty
  public isPasswordMatching: boolean = false;
  constructor(
    private auth: AuthService,
    private notify: NotificationService
  ){

  }

  ngOnInit(){

  }

  register(){
    if(this.isPasswordMatching){
      this.isRegistering = true;
      this.auth.register(this.user).then(
        () => {
          this.notify.notify(Notification.message('request.registrationSucceeded'));
          this.isRegistering = false;
          this.done.emit(null);
        },
        (err) => {
          this.isRegistering = false;
          if(err == "Timeout"){
            this.notify.notify(Notification.timeout());
          }else{
            this.notify.notify(new Notification('request.registrationFailed',['fail']));
          }
        }
      );

    }
  }

  matchPasswords(){
    this.isPasswordMatching = this.user.password == this.passwordCheck;
  }

}
