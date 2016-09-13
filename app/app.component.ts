import { Component, OnInit } from '@angular/core';

import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { TranslateService } from 'ng2-translate/ng2-translate';
import { I18nHelperService } from './i18n/i18n-helper.service';
import { NotificationService } from './utilities/notification.service';
import { Notification } from './utilities/notification';
import { AuthService } from './loopback-auth/auth.service';
import { User } from './loopback-auth/user';

// Add the RxJS Observable operators we need in this app.
import './rxjs-operators';

@Component({
  selector: 'my-app',
  templateUrl: 'app/app.component.html'
})
export class AppComponent implements OnInit{
  public isAuthenticated: boolean = false;


  constructor(
    private translate: TranslateService,
    private notify: NotificationService,
    private toastr: ToastsManager,
    private auth: AuthService,
    private i18n: I18nHelperService
  ){
    this.i18n.detectUserLanguage();
  }

  ngOnInit(){

    this.initNotificationHandler();

    //watch whether user is logged in or not
    this.auth.user.subscribe(
      (user) => this.updateAuthenticationState(user)
    );
    this.auth.loadUser().then(
      user => this.updateAuthenticationState(user)
    );

  }


  private updateAuthenticationState(user: User){
    this.isAuthenticated = user.isRegistered();
  }

  private initNotificationHandler(){
    this.notify.messages.subscribe(
      notification => {
        this.translate.get(notification.message).subscribe(
          (translatedMessage) => {

            if(notification.tags.indexOf("success") !== -1){
              this.toastr.success(translatedMessage);
            }else if(
              notification.tags.indexOf("fail") !== -1 ||
              notification.tags.indexOf("error") !== -1)
            {
              this.toastr.error(translatedMessage);
            }else{
              this.toastr.info(translatedMessage);
            }

          }
        );
      }
    );
  }

}
