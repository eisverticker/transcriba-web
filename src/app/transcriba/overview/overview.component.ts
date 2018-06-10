import {
  Component,
  Input,
  OnChanges,
  SimpleChanges
} from '@angular/core';

import { DiscussionService } from '../../discussion/discussion.service';
import { SourceService } from '../../source/source.service';
import { BackendService } from '../../utility/backend.service';
import { LoggerService } from '../../utility/logger.service';

import { TranscribaObject } from '../transcriba-object';
import { Discussion } from '../../discussion/discussion';
import { Source } from '../../source/source';
import { NotificationService } from '../../utility/notification.service';
import { Notification } from '../../utility/notification';

@Component({
  selector: 'tr-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnChanges {
  static logger = LoggerService.getCustomLogger(OverviewComponent.name);

  @Input() object: TranscribaObject;
  discussion: Discussion;
  source: Source;

  constructor(
    public backend: BackendService,
    private sourceService: SourceService,
    private discussionService: DiscussionService,
    private notificationService: NotificationService
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    this.discussionService.loadByID(this.object.discussionID).then(
      discussion => this.discussion = discussion,
      err => this.notificationService.notify(Notification.error('discussion not found'))
    );
    this.sourceService.loadSummaryByID(this.object.sourceID).then(
      source => this.source = source,
      err => OverviewComponent.logger.error('OverviewComponent', err)
    );
  }

}
