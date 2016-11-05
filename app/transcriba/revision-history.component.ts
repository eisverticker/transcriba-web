import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { TranscribaService } from './transcriba.service';

@Component({
  selector: 'revision-history',
  template:
  `
  <inline-spinner [active]="items == undefined"></inline-spinner>
  <table class="table" *ngIf="items">
    <tr>
      <th>Nutzer</th>
      <th>Datum</th>
      <th>Abgeschlossen</th>
      <th>Genehmigt</th>
    </tr>
    <tr *ngFor="let item of items">
      <td>{{ item.username }}</td>
      <td>{{ item.createdAt }}</td>
      <td><i class="fa fa-check" *ngIf="item.published" aria-hidden="true"></i></td>
      <td><i class="fa fa-check" *ngIf="item.approved" aria-hidden="true"></i></td>
    </tr>
  `
})
export class RevisionHistoryComponent implements OnChanges{
  @Input() objectId: any;
  items: Array<{id: string, username: string, createdAt: string, published: boolean, approved: boolean}>;

  constructor(
    private transcriba: TranscribaService
  ){}

  ngOnChanges(changes: SimpleChanges){
    this.transcriba.loadChronic(this.objectId).then(
      chronic => {
        this.items = chronic
      },
      err => console.log("failed to load chronic", err)
    );
  }
}
