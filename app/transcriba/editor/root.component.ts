import { Component, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

import { TeiBase } from './tei-base';
import { TeiElement } from './tei-element';


@Component({
  selector: 'tei-root',
  template:
  `
    <div *ngIf="tei">
      <tei-element *ngFor="let child of tei.children; let i = index" [index]="i" [(ngModel)]="tei.children[i]"></tei-element>
      <button class="btn btn-link">Seite hinzufügen</button>
    </div>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RootComponent),
      multi: true
    }
  ]
})
export class RootComponent extends TeiBase{

  constructor(){
    super();
  }

}
