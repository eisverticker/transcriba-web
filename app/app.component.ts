import { Component, OnInit } from '@angular/core';

import { ToastyService, ToastyConfig } from 'ng2-toasty';
import { TranslateService } from 'ng2-translate';
import { I18nHelperService } from './i18n/i18n-helper.service';
import { NotificationService } from './utilities/notification.service';
import { Notification } from './utilities/notification';
import { AppService, LayoutType } from './utilities/app.service';
import { AuthService } from './loopback-auth/auth.service';
import { User } from './loopback-auth/user';

// Add the RxJS Observable operators we need in this app.
import './rxjs-operators';

@Component({
  moduleId:     module.id,
  selector: 'my-app',
  templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit{
  isWideLayout: boolean = false;
  user: User;

  constructor(
    private translate: TranslateService,
    private notify: NotificationService,
    private auth: AuthService,
    private i18n: I18nHelperService,
    private app: AppService,
    private toastyService:ToastyService,
    private toastyConfig: ToastyConfig
  ){
    this.i18n.detectUserLanguage();
    this.toastyConfig.theme = 'bootstrap';
  }

  ngOnInit(){

    this.initNotificationHandler();

    //watch whether user is logged in or not
    this.auth.user.subscribe(
      (user) => this.user = user
    );
    this.auth.loadUser().then(
      (user) => this.user = user
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


  private processNotificationMessage(message: string, tags: Array<string>){
    if(tags.indexOf("success") !== -1){
      //this.toastr.success(message);
      this.toastyService.default(message);
    }else if(
      tags.indexOf("fail") !== -1 ||
      tags.indexOf("error") !== -1)
    {
      //this.toastr.error(message);
      this.toastyService.default(message);
    }else{
      //this.toastr.info(message);
      this.toastyService.default(message);
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
