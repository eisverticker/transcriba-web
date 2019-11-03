import { Component, OnInit } from '@angular/core';

import { InfoPage } from './info-page';
import { InfoPageService } from './info-page.service';
import { NotificationService } from '../utilities/notification.service';
import { Notification } from '../utilities/notification';

@Component({
  moduleId:     module.id,
  selector:    'tr-table-of-pages',
  templateUrl: 'info-page-management.component.html',
  styleUrls: []
})
export class InfoPageManagementComponent implements OnInit {

  public pages: Array<InfoPage> = [];

  constructor(
    private pageService: InfoPageService,
    private notify: NotificationService
  ) {}

  ngOnInit() {
    this.updateSources();
  }

  updateSources(): Promise<any> {
    return this.pageService.loadAll().then(
      (pages) => this.pages = pages,
      (err) => this.notify.notify(new Notification('request.fail', ['fail']))
    );
  }

  deletePage(page: InfoPage) {
    this.pageService.delete(page).then(
      () => {
        this.notify.notify(new Notification('request.success', ['success']));
        return this.updateSources();
      },
      (err) => this.notify.notify(new Notification('request.fail', ['fail']))
    );
  }

}
