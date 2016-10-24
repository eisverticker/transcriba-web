import { Component, Input, EventEmitter, Output} from '@angular/core';

import { TeiElement } from './tei-element';

@Component({
  moduleId:     module.id,
  selector:    'tei-editor',
  templateUrl: 'editor.component.html',
  styleUrls: []
})
export class EditorComponent{
  @Input() content: TeiElement;
  @Input() objectId: any;

  @Output() save: EventEmitter<any> = new EventEmitter();
  @Output() publish: EventEmitter<any> = new EventEmitter();

  constructor(){}

  saveContent(){
    this.save.emit(this.content);
  }

  publishContent(){
    this.publish.emit(this.content);
  }


}
