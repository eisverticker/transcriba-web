import {
  Component,
  Input,
  OnChanges,
  SimpleChanges
} from '@angular/core';

import { TranscribaObject } from '../transcriba-object';
import { Discussion } from '../../discussion/discussion';
import { Source } from '../../source/source';

import { TranscribaService } from '../transcriba.service';
import { DiscussionService } from '../../discussion/discussion.service';
import { SourceService } from '../../source/source.service';
import { BackendService } from '../../utility/backend.service';

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
    private transcriba: TranscribaService,
    public backend: BackendService,
    private sourceService: SourceService,
    private discussionService: DiscussionService
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    this.discussionService.loadByID(this.object.discussionID).then(
      (discussion) => this.discussion = discussion,
      err => console.log(err)
    );
    this.sourceService.loadSummaryByID(this.object.sourceID).then(
      source => this.source = source,
      err => console.log('error', err)
    );
  }

}
