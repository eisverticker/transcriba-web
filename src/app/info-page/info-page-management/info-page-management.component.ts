import { Component, OnInit } from '@angular/core';

import { InfoPage } from '../info-page';
import { InfoPageService } from '../info-page.service';
import { NotificationService } from '../../utility/notification.service';
import { Notification } from '../../utility/notification';


@Component({
  selector: 'inf-info-page-management',
  templateUrl: './info-page-management.component.html',
  styleUrls: ['./info-page-management.component.scss']
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
