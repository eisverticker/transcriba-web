import { Component, OnInit } from '@angular/core';

import { InfoPage } from './info-page';
import { InfoPageService } from './info-page.service';
import { NotificationService } from '../utilities/notification.service';
import { Notification } from '../utilities/notification';

@Component({
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

  async updateSources(): Promise<any> {
    try {
      const pages = await this.pageService.loadAll();
      return this.pages = pages;
    } catch (err) {
      return this.notify.notify(new Notification('request.fail', ['fail']));
    }
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
