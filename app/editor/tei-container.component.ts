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
  selector: 'tei-container',
  template:
  `
  <div #container class="panel panel-primary" [class.panel-primary]="editable" [class.panel-default]="!editable">
    <div class="panel-heading big-panel-heading">
      Transkription <span *ngIf="label">- {{ label }}</span>
    </div>
    <div #contentContainer class="panel-body bg-info" style="overflow-y: auto;">
      <tei-root [editable]="editable" *ngIf="content" [(ngModel)]="content"></tei-root>
    </div>
    <div class="panel-footer">
      <div *ngIf="editable">
        <button (click)="saveContent()" class="btn btn-default">Speichern</button>
        <button (click)="publishContent()" class="btn btn-primary">Abschließen</button>
      </div>
      <div *ngIf="!editable">
        <div class="alert alert-warning" role="alert">
          Dieses Objekt ist nicht im Bearbeitungsmodus geöffnet.
        </div>
      </div>
    </div>
  </div>
  `
})
export class TeiContainerComponent implements AfterViewInit{
  @Input() label: string;
  @Input() content: TeiElement;
  @Input() editable: boolean;

  @Output() save: EventEmitter<any> = new EventEmitter();
  @Output() publish: EventEmitter<any> = new EventEmitter();

  @ViewChild('container') container: ElementRef;
  @ViewChild('contentContainer') contentContainer: ElementRef;

  @HostListener('window:resize', ['$event'])
  onResize($event){
    this.fitViewPort();
  }

  constructor(){}

  private fitViewPort(){
    let rectOuter = this.container.nativeElement.getBoundingClientRect();
    let rectInner = this.contentContainer.nativeElement.getBoundingClientRect();

    //console.log(rectOuter, rectInner, difference);
    let viewPortHeight = window.innerHeight;
    let newHeight: string = (viewPortHeight-rectInner.top-145) + "px";

    this.contentContainer.nativeElement.style.maxHeight = newHeight;
    //this.contentContainer.nativeElement.style.height = newHeight;
  }

  saveContent(){
    this.save.emit(this.content);
  }

  publishContent(){
    this.publish.emit(this.content);
  }

  ngAfterViewInit() {
    this.fitViewPort();
  }

}
