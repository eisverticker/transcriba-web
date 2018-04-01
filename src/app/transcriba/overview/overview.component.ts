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

@Component({
  selector: 'tr-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnChanges {
  @Input() object: TranscribaObject;
  discussion: Discussion;
  source: Source;

  constructor(
    public backend: BackendService,
    private sourceService: SourceService,
    private discussionService: DiscussionService,
    private logger: LoggerService
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    this.discussionService.loadByID(this.object.discussionID).then(
      discussion => this.discussion = discussion,
      err => this.logger.error('OverviewComponent', err)
    );
    this.sourceService.loadSummaryByID(this.object.sourceID).then(
      source => this.source = source,
      err => this.logger.error('OverviewComponent', err)
    );
  }

}
