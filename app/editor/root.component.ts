import { Component, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

import { TeiBase } from './tei-base';
import { TeiElement } from './tei-element';


@Component({
  selector: 'tei-root',
  template:
  `
    <div *ngIf="tei">
      <tei-element [editable]="editable" (killMe)="deleteChild($event)" *ngFor="let child of tei.children; let i = index" [index]="i" [(ngModel)]="tei.children[i]"></tei-element>
      <div class="well" *ngIf="tei.children.length == 0">Diese Transkription ist leer <i class="fa fa-frown-o" aria-hidden="true"></i></div>
      <button *ngIf="editable" (click)="addPage()" class="btn btn-link">Seite hinzufügen</button>
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
  @Input() editable: boolean;

  constructor(){
    super();
  }

  addPage(){
    this.tei.children.push(new TeiElement('page', {}, []));
  }

  deleteChild(index){
    this.tei.children = this.tei.children.filter(
      (_, i) => index !== i
    );
  }

}
