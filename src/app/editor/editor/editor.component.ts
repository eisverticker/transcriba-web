import {
  Component,
  Input,
  EventEmitter,
  Output,
  OnChanges,
  OnDestroy,
  SimpleChanges
} from '@angular/core';

import { AppService} from '../../utility/app.service';
import { LayoutType } from '../../utility/layout-type.enum';

import { TeiElement } from '../tei-element';

@Component({
  selector: 'tr-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
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
