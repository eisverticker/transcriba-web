import {
  Component,
  Input,
  Output,
  HostListener,
  ViewChild,
  ElementRef,
  AfterViewInit,
  EventEmitter
} from '@angular/core';

import { TeiElement } from './tei-element';


@Component({
  selector: 'tr-tei-container',
  template:
  `
  <div #container class="panel panel-primary" [class.panel-primary]="editable" [class.panel-default]="!editable">
    <div class="panel-heading big-panel-heading">
      Transkription <span *ngIf="label">- {{ label }}</span>
    </div>
    <div #contentContainer class="panel-body bg-info" style="overflow-y: auto;">
      <tr-tei-root [markDirty]="markDirty" [editable]="editable" *ngIf="content" [(ngModel)]="content"></tr-tei-root>
    </div>
    <div class="panel-footer">
      <div *ngIf="editable">
        <button (click)="saveContent()" class="btn btn-default">{{ 'action.save' | translate }}</button>
        <button (click)="publishContent()" class="btn btn-primary">{{ 'action.publish' | translate }}</button>
        <button (click)="abortTranscription()" class="btn btn-danger">{{ 'action.abort' | translate }}</button>
      </div>
      <div *ngIf="!editable">
        <div class="alert alert-warning" role="alert">
          {{ 'message.readOnlyMode' | translate }}
        </div>
      </div>
    </div>
  </div>
  `
})
export class TeiContainerComponent implements AfterViewInit {
  @Input() label: string;
  @Input() content: TeiElement;
  @Input() editable: boolean;
  @Input() markDirty: boolean;

  @Output() save: EventEmitter<any> = new EventEmitter();
  @Output() publish: EventEmitter<any> = new EventEmitter();
  @Output() abort: EventEmitter<any> = new EventEmitter();

  @ViewChild('container', { static: true }) container: ElementRef;
  @ViewChild('contentContainer', { static: true }) contentContainer: ElementRef;

  @HostListener('window:resize', ['$event'])
  onResize($event) {
    this.fitViewPort();
  }

  saveContent() {
    this.save.emit(this.content);
  }

  publishContent() {
    this.publish.emit(this.content);
  }

  ngAfterViewInit() {
    this.fitViewPort();
  }

  abortTranscription() {
    this.abort.emit();
  }

  private fitViewPort() {
    // values are not being used yet but could be useful later
    // let rectOuter = this.container.nativeElement.getBoundingClientRect();
    let rectInner = this.contentContainer.nativeElement.getBoundingClientRect();
    // console.log(rectOuter, rectInner, difference);

    let viewPortHeight = window.innerHeight;
    let newHeight: string = (viewPortHeight - rectInner.top - 145) + 'px';

    this.contentContainer.nativeElement.style.maxHeight = newHeight;
    // this.contentContainer.nativeElement.style.height = newHeight;
  }

}
