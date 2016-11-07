import { Component, OnInit } from '@angular/core';

import { TranscribaObject } from './transcriba-object';
import { BackendHelper } from '../utilities/backend-helper';
import { TranscribaService } from './transcriba.service';

@Component({
  selector: 'voting-suggestions',
  template:
  `
    <div *ngIf="objects && !(page == 0 && objects.length == 0)" class="panel panel-default">
      <div class="panel-heading">
        <span>An Abstimmungen teilnehmen</span>
        <button *ngIf="objects.length == 3" class="btn btn-default" (click)="nextPage()">Umblättern</button>
        <button *ngIf="page !== 0" class="btn btn-default" (click)="previousPage()">Zurück</button>
      </div>
      <div class="panel-body">
        <div *ngIf="!objects || objects.length == 0">
          Keine Objekte vorhanden
        </div>
        <div class="col-md-4" *ngFor="let object of objects">
          <a class="thumbnail" [routerLink]="'/obj/'+object.id+'/transcribe'" class="btn btn-default">
            <img [src]="backend.unAuthUrl('TranscribaObjects/'+object.id+'/thumbnail')" alt="thumbnail">
          </a>
          <div class="caption">
            <p>{{ object.title }}</p>
          </div>
        </div>
      </div>
    </div>
  `
})
export class VotingSuggestionComponent implements OnInit{

  objects: Array<TranscribaObject>;
  page: number = 0;

  constructor(
    private transcriba: TranscribaService,
    public backend: BackendHelper
  ){}

  ngOnInit(){
    this.updateObjects();
  }

  nextPage(){
    this.page++;
    this.updateObjects();
  }

  previousPage(){
    this.page--;
    this.updateObjects();
  }

  updateObjects(){
    this.transcriba.loadObjectPage(this.page,3, undefined, undefined,"voting").then(
      objects => this.objects = objects,
      err => console.log(err)
    );
  }

}
