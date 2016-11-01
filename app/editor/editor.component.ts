import {
  Component,
  Input,
  EventEmitter,
  Output,
  OnChanges,
  OnDestroy
} from '@angular/core';

import { AppService, LayoutType } from '../utilities/app.service';

import { TeiElement } from './tei-element';

@Component({
  selector:    'tei-editor',
  template:
  `
  <div *ngIf="objectId && contents" class="row">
    <div [class.col-md-6]="contents.length==1" [class.col-md-4]="contents.length==2">
      <image-viewer [objectId]="objectId"></image-viewer>
    </div>
    <div *ngFor="let content of contents; let i = index" [class.col-md-6]="contents.length==1" [class.col-md-4]="contents.length==2">
      <tei-container (save)="saveContent($event)" (publish)="publishContent($event)" [label]="labels[i]" [content]="contents[i]" [editable]="editable"></tei-container>
    </div>
  </div>

  `,
  styleUrls: []
})
export class EditorComponent implements OnChanges, OnDestroy{
  @Input() contents: Array<TeiElement>;
  @Input() labels: Array<string> = [];
  @Input() objectId: any;
  @Input() editable: boolean = false;

  @Output() save: EventEmitter<any> = new EventEmitter();
  @Output() publish: EventEmitter<any> = new EventEmitter();


  isInit: boolean = false;

  constructor(
    private app: AppService
  ){}

  ngOnChanges(){
    if(this.contents && this.contents.length > 2) throw "too many contents given";
    this.app.setLayoutType(LayoutType.wide);
  }

  saveContent(){
    this.save.emit(this.contents[0]);
  }

  publishContent(){
    this.publish.emit(this.contents[0]);
  }

  ngOnDestroy(){
    this.app.resetLayout();
  }


}
