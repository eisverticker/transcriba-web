import { Injectable } from '@angular/core';

import { TeiElementComponent } from './tei-element.component';

@Injectable()
export class EditorService{

  private focusedElement: TeiElementComponent = null;

  constructor(){}

  setFocusedElement(element){
    if(this.focusedElement){
      this.focusedElement.unfocus();
    }
    this.focusedElement = element;
  }


}
