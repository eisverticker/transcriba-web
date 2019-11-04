import {
  Component,
  Input,
  EventEmitter,
  Output,
  OnChanges,
  OnDestroy,
  SimpleChanges
} from '@angular/core';

import { AppService, LayoutType } from '../utilities/app.service';

import { TeiElement } from './tei-element';

@Component({
  selector:    'tr-tei-editor',
  template:
  `
  <div *ngIf="objectId && contents" class="row">
    <div class="hidden-xs" [class.col-sm-6]="contents.length==1" [class.col-sm-4]="contents.length==2">
      <tr-image-viewer [objectId]="objectId"></tr-image-viewer>
    </div>
    <div *ngFor="let content of contents; let i = index" [class.col-sm-6]="contents.length==1" [class.col-sm-4]="contents.length==2">
      <div *ngIf="enableStarter" style="margin-bottom: 10px;">
        <button (click)="starter()"  class="btn btn-default">
          An Transkription weiterarbeiten
        </button>
      </div>
      <tr-tei-container
        (save)="saveContent($event)"
        (publish)="publishContent($event)"
        (abort)="abortTranscription()"
        [label]="labels[i]"
        [content]="contents[i]"
        [markDirty]="markDirty[i]"
        [editable]="editable">
      </tr-tei-container>
    </div>
  </div>

  `,
  styleUrls: []
})
export class EditorComponent implements OnChanges, OnDestroy {
  @Input() contents: Array<TeiElement>;
  @Input() labels: Array<string> = [];
  @Input() objectId: any;
  @Input() editable = false;
  @Input() enableStarter = false;

  // should we highlight changes? (in comparison to previous revision)
  @Input() markDirty: Array<boolean>;

  @Output() save: EventEmitter<any> = new EventEmitter();
  @Output() publish: EventEmitter<any> = new EventEmitter();
  @Output() abort: EventEmitter<any> = new EventEmitter();
  @Output() start: EventEmitter<any> = new EventEmitter();


  isInit = false;

  constructor(
    private app: AppService
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    if (this.contents && this.contents.length > 2) {
      throw new Error('too many contents given');
    }
    this.app.setLayoutType(LayoutType.wide);
  }

  saveContent() {
    this.save.emit(this.contents[0]);
  }

  publishContent() {
    this.publish.emit(this.contents[0]);
  }

  abortTranscription() {
    this.abort.emit();
  }

  starter() {
    this.start.emit();
  }

  ngOnDestroy() {
    this.app.resetLayout();
  }


}
