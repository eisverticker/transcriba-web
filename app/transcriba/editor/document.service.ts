import { Injectable } from '@angular/core';

import { TeiElementComponent } from './tei-element.component';

@Injectable()
export class DocumentService{

  private unsaved: Array<TeiElementComponent> = [];
  private focusedElement: TeiElementComponent = null;

  constructor(){

  }

  setFocusedElement(element){
    if(this.focusedElement){
      this.focusedElement.unfocus();
    }
    this.focusedElement = element;
  }

  /**
   *
   */
  registerUnsavedElement(element){
    this.unsaved.push(element);
  }

  saveUnsavedChanges(){
    this.unsaved.forEach(
      element => element.saveChanges()
    );
    this.unsaved = [];
  }

}
