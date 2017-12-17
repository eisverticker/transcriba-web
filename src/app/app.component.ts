import { Component, OnInit } from '@angular/core';
import { I18nHelperService } from './i18n/i18n-helper.service';
import { Observable } from 'rxjs/Observable';
import {
  MatSnackBar,
  MatDialog
} from '@angular/material';
import { Router } from '@angular/router';
import { SimpleDialogComponent } from './transcriba-ui/simple-dialog/simple-dialog.component';
import { NotificationService } from './utility/notification.service';
import { Notification } from './utility/notification';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from './loopback-auth/auth.service';
import { User } from './loopback-auth/user';

@Component({
  selector: 'tr-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  user: Observable<User>;

  constructor(
    private i18n: I18nHelperService,
    private snacks: MatSnackBar,
    private dialog: MatDialog,
    private notify: NotificationService,
    private translate: TranslateService,
    private authService: AuthService,
    private router: Router
  ) {
    this.i18n.initUserLanguage();
    this.user = this.authService.user;
  }

  ngOnInit() {
    this.initNotificationHandler();
    this.user.subscribe(
      (user) => {
        if(user.isRegistered() && !user.completedTutorial) {
          let alert = new Notification('message.tutorialFirst', ['info', 'attention']);
          this.notify.notify(alert);
          this.router.navigate(['/tutorial']);
        }
      }
    );
  }

  private processNotificationMessage(message: string, tags: Array<string>) {
    if(tags.indexOf('attention') !== -1){
      this.dialog.open(SimpleDialogComponent, {
        data: {
          'message': message
        }
      });
    }else{
      this.snacks.open(message, '', {
        duration: 2000,
        verticalPosition: 'bottom'
      });
    }

    // TODO: simple dialog should present different types of dialogs with
    //  different visuals
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
