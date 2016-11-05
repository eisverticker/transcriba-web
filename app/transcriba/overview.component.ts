import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { TranscribaObject } from './transcriba-object';
import { Discussion } from '../discussion/discussion';
import { Source } from '../source/source';

import { TranscribaService } from './transcriba.service';
import { DiscussionService } from '../discussion/discussion.service';
import { SourceService } from '../source/source.service';
import { BackendHelper } from '../utilities/backend-helper';

@Component({
  selector: 'object-overview',
  template:
  `
  <h2>{{ object.title }}</h2>
  <div class="row">
    <div>
      <a [routerLink]="'/obj/'+object.id+'/viewer'">
        <img style="height: 512px; " class="img-responsive" [src]="backend.unAuthUrl('TranscribaObjects/'+object.id+'/overview')" alt="thumbnail" />
      </a>
    </div>
  </div>
  <h3>Infos</h3>
  <dl *ngIf="source">
    <dt>Quelle</dt>
    <dd>{{ source.title }} ({{ object.externalID }})</dd>
  </dl>

  <h3>Zuletzt geschriebene Kommentare</h3>
  <latest-comments *ngIf="discussion" [numOfItems]="3" [discussionId]="discussion.id"></latest-comments>
  `
})
export class OverviewComponent implements OnChanges{
  @Input() object: TranscribaObject;
  discussion: Discussion;
  source: Source;

  constructor(
    private transcriba: TranscribaService,
    public backend: BackendHelper,
    private sourceService: SourceService,
    private discussionService: DiscussionService
  ){}

  ngOnChanges(changes: SimpleChanges){
    this.discussionService.loadByID(this.object.discussionID).then(
      (discussion) => this.discussion = discussion,
      err => console.log(err)
    );
    this.sourceService.loadByID(this.object.sourceID).then(
      source => this.source = source,
      err => console.log("error", err)
    );
  }
}
