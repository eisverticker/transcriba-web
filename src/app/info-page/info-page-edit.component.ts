import { Component, OnInit } from '@angular/core';

import { InfoPage } from './info-page';
import { InfoPageService } from './info-page.service';
import { NotificationService } from '../utilities/notification.service';
import { Notification } from '../utilities/notification';

import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector:    'tr-info-page-edit',
  templateUrl: 'info-page-edit.component.html',
  styleUrls: []
})
export class InfoPageEditComponent implements OnInit {

  page: InfoPage = InfoPage.createEmptyPage();
  isSaving = false;
  isLastAttemptFailed = false;

  constructor(
    private pageService: InfoPageService,
    private notify: NotificationService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe(
      (params) => {
        if (params['id'] === 'new') {
          this.page = InfoPage.createEmptyPage();
        } else {
          this.pageService.loadOneByID(params['id']).then(
            (page) => this.page = page,
            (err) => {
              this.notify.notify(new Notification('request.fail', ['fail']));
              this.router.navigate(['/pages']);
            }
          );
        }
      }
    );
  }

  save() {
    this.isSaving = true;
    this.pageService.save(this.page).then(
      () => {
        this.notify.notify(new Notification('request.success', ['success']));
        this.router.navigate(['/pages']);
        this.isLastAttemptFailed = false;
        this.isSaving = false;
      },
      (err) => {
        this.notify.notify(new Notification('request.fail', ['fail']));
        this.isLastAttemptFailed = true;
        this.isSaving = false;
      }
    );
  }

}
