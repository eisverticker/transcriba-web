import { Component, OnInit } from '@angular/core';

import { TranscribaObject } from '../transcriba-object';
import { BackendService } from '../../utility/backend.service';
import { TranscribaService } from '../transcriba.service';

@Component({
  selector: 'tr-voting-suggestion',
  templateUrl: './voting-suggestion.component.html',
  styleUrls: ['./voting-suggestion.component.scss']
})
export class VotingSuggestionComponent implements OnInit {

  objects: Array<TranscribaObject>;
  page = 0;

  constructor(
    private transcriba: TranscribaService,
    public backend: BackendService
  ) {}

  ngOnInit() {
    this.updateObjects();
  }

  nextPage() {
    this.page++;
    this.updateObjects();
  }

  previousPage() {
    this.page--;
    this.updateObjects();
  }

  updateObjects() {
    this.transcriba.loadObjectPage(this.page, 3, undefined, undefined, 'voting').then(
      objects => this.objects = objects,
      err => console.log(err)
    );
  }

}
