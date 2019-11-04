import { Component, OnInit } from '@angular/core';

import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { I18nHelperService } from './i18n/i18n-helper.service';
import { NotificationService } from './utilities/notification.service';
import { Notification } from './utilities/notification';
import { AppService, LayoutType } from './utilities/app.service';
import { AuthService } from './loopback-auth/auth.service';
import { User } from './loopback-auth/user';

@Component({
  selector: 'tr-app',
  templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit {
  isWideLayout = false;
  user: User;

  constructor(
    private translate: TranslateService,
    private notify: NotificationService,
    private auth: AuthService,
    private i18n: I18nHelperService,
    private app: AppService,
    private toastrService: ToastrService
  ) {
    this.i18n.detectUserLanguage();
  }

  ngOnInit() {

    this.initNotificationHandler();

    // watch whether user is logged in or not
    this.auth.user.subscribe(
      (user: User) => this.user = user
    );
    this.auth.loadUser().then(
      (user: User) => this.user = user
    );

    // watch if a module needs a wide page
    this.app.layout.subscribe(
      (type: LayoutType) => {
        if (type === LayoutType.wide) {
          this.isWideLayout = true;
        } else {
          this.isWideLayout = false;
        }
      }
    );

  }


  private processNotificationMessage(message: string, tags: Array<string>) {
    if (tags.indexOf('success') !== -1) {
      // this.toastr.success(message);
      this.toastrService.success(message);
    } else if (
      tags.indexOf('fail') !== -1 ||
      tags.indexOf('error') !== -1
    ) {
      // this.toastr.error(message);
      this.toastrService.error(message);
    } else {
      // this.toastr.info(message);
      this.toastrService.info(message);
    }
  }

  private initNotificationHandler() {
    this.notify.messages.subscribe(
      (notification: Notification) => {
        if (notification.tags.indexOf('untranslated') !== -1) {
          this.processNotificationMessage(notification.message, notification.tags);
        } else {
          this.translate.get(notification.message).subscribe(
            (translatedMessage) => this.processNotificationMessage(translatedMessage, notification.tags)
          );
        }
      }
    );
  }

}
