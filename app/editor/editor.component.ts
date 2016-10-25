import { Component, Input, EventEmitter, Output, OnChanges} from '@angular/core';

import { TeiElement } from './tei-element';

@Component({
  moduleId:     module.id,
  selector:    'tei-editor',
  templateUrl: 'editor.component.html',
  styleUrls: []
})
export class EditorComponent implements OnChanges{
  @Input() contents: Array<TeiElement>;
  @Input() objectId: any;
  @Input() readOnly: boolean = false;

  @Output() save: EventEmitter<any> = new EventEmitter();
  @Output() publish: EventEmitter<any> = new EventEmitter();

  constructor(){}

  ngOnChanges(){
    if(this.contents && this.contents.length > 2) throw "too many contents given";
    console.log(this.contents);
  }

  saveContent(){
    this.save.emit(this.contents[0]);
  }

  publishContent(){
    this.publish.emit(this.contents[0]);
  }


}
