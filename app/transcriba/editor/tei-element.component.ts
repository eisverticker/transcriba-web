import { Component, Input, OnInit, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

import { TeiBase } from './tei-base';
import { TeiElement } from './tei-element';

import { DocumentService } from './document.service';


@Component({
  selector: 'tei-element',
  template:
  `
    <ng-container [ngSwitch]="tei.type">
      <div *ngSwitchCase="'page'" class="well">
        <div>
          Seite <button class="btn btn-link editor-link" (click)="delete()">Löschen</button>
        </div>
        <div>
          <tei-element *ngFor="let child of tei.children; let i = index" [index]="i" [(ngModel)]="tei.children[i]"></tei-element>
        </div>
        <button class="btn btn-link" (click)="addParagraph()">Absatz hinzufügen</button>
        <button class="btn btn-link" (click)="addCaption()">Überschrift hinzufügen</button>
      </div>
      <div *ngSwitchCase="'line'" class="editor-line">
        <tei-element *ngFor="let child of tei.children; let i = index" [index]="i" [(ngModel)]="tei.children[i]"></tei-element>
      </div>
      <div *ngSwitchCase="'paragraph'" class="panel panel-info">
        <div class="panel-heading editor-panel-heading">
          Absatz <button class="btn btn-link editor-link" (click)="delete()">Löschen</button>
        </div>
        <div class="panel-body">
          <tei-element *ngFor="let child of tei.children; let i = index" [index]="i" [(ngModel)]="tei.children[i]"></tei-element>
          <button class="btn btn-link" (click)="addLine()">Zeile hinzufügen</button>
        </div>
      </div>
      <span *ngSwitchCase="'textPartOrdinary'">
        <span (click)="focus()" (input)="textChange($event)">{{ tei.properties.value || replaceIfEmpty }}</span>
        <i *ngIf="tei.isFocused" (click)="delete()" class="fa fa-times" aria-hidden="true"></i>
      </span>
      <span *ngSwitchCase="'textPartDeleted'">
        <del (click)="focus()" (input)="textChange($event)">{{ tei.properties.value }}</del>
        <i *ngIf="tei.isFocused" (click)="delete()" class="fa fa-times" aria-hidden="true"></i>
      </span>
    </ng-container>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TeiElementComponent),
      multi: true
    }
  ]
})
export class TeiElementComponent extends TeiBase implements OnInit {
  @Input() index: number;
  private value: any;

  constructor(
    private docs: DocumentService
  ){
    super();
  }

  ngOnInit(){
    console.log("init element of type "+this.tei.type);
  }

  delete(){
    console.log("element of type "+this.tei.type+" with index "+ this.index +" wants to be deleted");
  }

  focus(){
    this.docs.setFocusedElement(this);
    this.tei.isFocused = true;
  }

  unfocus(){
    this.tei.isFocused = false;
  }

  shout(){
    alert("wow")
  }

  saveChanges(){
    this.tei.properties.value = this.value;
  }

  textChange(event){
    this.value = event.target.innerText;
  }

  addLine(){
    let defaultTextPart = new TeiElement('textPartOrdinary', { value: "Hallo" }, []);
    this.tei.children.push(new TeiElement('line', {}, [defaultTextPart]));
  }

  addParagraph(){

  }

  addCaption(){

  }

}
