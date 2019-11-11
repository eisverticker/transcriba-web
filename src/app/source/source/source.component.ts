import { Component, OnInit } from '@angular/core';

import { Source } from '../source';
import { SourceService } from '../source.service';
import { NotificationService } from '../../utility/notification.service';
import { Notification } from '../../utility/notification';

@Component({
  selector: 'src-source',
  templateUrl: './source.component.html',
  styleUrls: ['./source.component.scss']
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

  updateSources(): Promise<any> {
    return this.sourceService.loadAllSources().then(
      (sources) => this.sources = sources,
      (err) => this.notify.notify(new Notification('request.fail', ['fail']))
    );
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
