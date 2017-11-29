import { Component, OnInit } from '@angular/core';
import { I18nHelperService } from './i18n/i18n-helper.service';
import { Observable } from 'rxjs/Observable';
import { MatSnackBar } from '@angular/material';
import { NotificationService } from './utility/notification.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'tr-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    private i18n: I18nHelperService,
    private snacks: MatSnackBar,
    private notify: NotificationService,
    private translate: TranslateService
  ) {
    this.i18n.initUserLanguage();
  }

  ngOnInit() {
    this.initNotificationHandler();
  }

  private processNotificationMessage(message: string, tags: Array<string>) {
    this.snacks.open(message, '', {
      duration: 2000,
      verticalPosition: 'bottom'
    });

    /*if (tags.indexOf('success') !== -1) {
      // this.toastr.success(message);
      this.toastyService.success(message);
    }else if (
      tags.indexOf('fail') !== -1 ||
      tags.indexOf('error') !== -1
    ) {
      // this.toastr.error(message);
      this.toastyService.error(message);
    }else {
      // this.toastr.info(message);
      this.toastyService.info(message);
    }*/
  }

  private initNotificationHandler() {
    this.notify.messages.subscribe(
      notification => {
        if (notification.tags.indexOf('untranslated') !== -1) {
          this.processNotificationMessage(notification.message, notification.tags);
        }else {
          this.translate.get(notification.message).subscribe(
            (translatedMessage) =>
            this.processNotificationMessage(
              translatedMessage,
              notification.tags
            )
          );
        }
      }
    );
  }

}
