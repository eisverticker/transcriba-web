import { Component, OnInit } from '@angular/core';

import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { TranslateService } from 'ng2-translate/ng2-translate';
import { I18nHelperService } from './i18n/i18n-helper.service';
import { NotificationService } from './utilities/notification.service';
import { Notification } from './utilities/notification';
import { AppService, LayoutType } from './utilities/app.service';
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
  public isWideLayout: boolean = false;

  constructor(
    private translate: TranslateService,
    private notify: NotificationService,
    private toastr: ToastsManager,
    private auth: AuthService,
    private i18n: I18nHelperService,
    private app: AppService
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

    //watch if a module needs a wide page
    this.app.layout.subscribe(
      type => {
        if(type == LayoutType.wide){
          this.isWideLayout = true;
        }else{
          this.isWideLayout = false;
        }
      }
    );

  }


  private updateAuthenticationState(user: User){
    this.isAuthenticated = user.isRegistered();
  }

  private processNotificationMessage(message: string, tags: Array<string>){
    if(tags.indexOf("success") !== -1){
      this.toastr.success(message);
    }else if(
      tags.indexOf("fail") !== -1 ||
      tags.indexOf("error") !== -1)
    {
      this.toastr.error(message);
    }else{
      this.toastr.info(message);
    }
  }

  private initNotificationHandler(){
    this.notify.messages.subscribe(
      notification => {
        if(notification.tags.indexOf('untranslated') !== -1){
          this.processNotificationMessage(notification.message, notification.tags);
        }else{
          this.translate.get(notification.message).subscribe(
            (translatedMessage) => this.processNotificationMessage(translatedMessage, notification.tags)
          );
        }
      }
    );
  }

}
