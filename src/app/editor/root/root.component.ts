import { Component, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

import { TeiBase } from '../tei-base';
import { TeiElement } from '../tei-element';

@Component({
  selector: 'tr-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RootComponent),
      multi: true
    }
  ]
})
export class RootComponent extends TeiBase {
  @Input() editable: boolean;
  @Input() markDirty: boolean;

  constructor() {
    super();
  }

  addPage() {
    this.tei.children.push(new TeiElement('page', {}, []));
  }

  deleteChild(index) {
    this.tei.children = this.tei.children.filter(
      (_, i) => index !== i
    );
  }

}
