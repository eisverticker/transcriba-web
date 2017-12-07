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

import { TeiElement } from '../tei-element';

@Component({
  selector: 'tr-tei-container',
  templateUrl: './tei-container.component.html',
  styleUrls: ['./tei-container.component.scss']
})
export class TeiContainerComponent implements AfterViewInit {
  @Input() label: string;
  @Input() content: TeiElement;
  @Input() editable: boolean;
  @Input() markDirty: boolean;

  @Output() save: EventEmitter<any> = new EventEmitter();
  @Output() publish: EventEmitter<any> = new EventEmitter();
  @Output() abort: EventEmitter<any> = new EventEmitter();

  @ViewChild('container') container: ElementRef;
  @ViewChild('contentContainer') contentContainer: ElementRef;

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
    const rectInner = this.contentContainer.nativeElement.getBoundingClientRect();
    // console.log(rectOuter, rectInner, difference);

    const viewPortHeight = window.innerHeight;
    const newHeight: string = (viewPortHeight - rectInner.top - 145) + 'px';

    this.contentContainer.nativeElement.style.maxHeight = newHeight;
    // this.contentContainer.nativeElement.style.height = newHeight;
  }

}