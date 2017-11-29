import { Injectable } from '@angular/core';

import { TeiElementComponent } from './tei-element/tei-element.component';

@Injectable()
export class EditorService {

  private focusedElement: TeiElementComponent = null;

  setFocusedElement(element) {
    if (this.focusedElement) {
      this.focusedElement.unfocus();
    }
    this.focusedElement = element;
  }

}
