import { Component, OnInit } from '@angular/core';

import { Source } from './source';
import { SourceService } from './source.service';
import { NotificationService } from '../utilities/notification.service';
import { Notification } from '../utilities/notification';

@Component({
  selector:    'tr-table-of-sources',
  templateUrl: 'source.component.html',
  styleUrls: []
})
export class SourceComponent implements OnInit {

  public sources: Array<Source> = [];

  constructor(
    private sourceService: SourceService,
    private notify: NotificationService
  ) {}

  ngOnInit() {
    this.updateSources();
  }

  async updateSources(): Promise<any> {
    try {
      const sources = await this.sourceService.loadAllSources();
      return this.sources = sources;
    } catch (err) {
      return this.notify.notify(new Notification('request.fail', ['fail']));
    }
  }

  deactivate(source: Source) {
    source.activated = false;
    this.sourceService.save(source).then(
      () => this.updateSources(),
      () => this.notify.notify(new Notification('request.fail', ['fail']))
    );
  }

  activate(source: Source) {
    source.activated = true;
    this.sourceService.save(source).then(
      () => this.updateSources(),
      () => this.notify.notify(new Notification('request.fail', ['fail']))
    );
  }

}
