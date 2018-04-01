import { Component, OnInit } from '@angular/core';

import { Collection } from '../collection';
import { TranscribaObject } from '../transcriba-object';
import { TranscribaService } from '../transcriba.service';
import { NotificationService } from '../../utility/notification.service';
import { BackendService } from '../../utility/backend.service';

import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'tr-explorer',
  templateUrl: './explorer.component.html',
  styleUrls: ['./explorer.component.scss']
})
export class ExplorerComponent implements OnInit {
  collections: Array<Collection> = [];
  objects: Array<TranscribaObject> = [];

  pagination = {
    currentPage: 0,
    numOfItems: 0,
    numOfPages: 1,
    itemsPerPage: 12
  };

  isLoading = true;
  collectionId: any;
  filter = {
    stage: {
      unprocessed: true,
      transcription: true,
      review: true,
      reviewed: true
    },
    latestSearchTerm: '',
    lastSearchTerm: ''
  };


  constructor(
    private transcriba: TranscribaService,
    private notify: NotificationService,
    private route: ActivatedRoute,
    private router: Router,
    public backend: BackendService
  ) {}

  ngOnInit() {
    this.route.data.subscribe( data => {
      this.route.params.subscribe(
        params => this.updateData()
      );
    });
  }

  setPage(page: number) {
    this.pagination.currentPage = page;
    this.updateData();
  }

  find() {
    if (this.filter.latestSearchTerm !== this.filter.lastSearchTerm) {
      this.pagination.currentPage = 0;
      this.filter.lastSearchTerm = this.filter.latestSearchTerm;
      this.updateData();
    }
  }

  private setNumberOfPages() {
    this.pagination.numOfPages = Math.ceil(
      this.pagination.numOfItems / this.pagination.itemsPerPage
    );
  }

  private updateData() {
    this.isLoading = true;

    let searchValue: string;

    if (this.filter.latestSearchTerm.length < 2) {
      searchValue = undefined;
    } else {
      searchValue = this.filter.latestSearchTerm;
    }

    return this.transcriba.loadObjectCount(searchValue).then(
      count => {
        this.pagination.numOfItems = count;
        this.setNumberOfPages();
        return this.transcriba
         .loadObjectPage(this.pagination.currentPage, this.pagination.itemsPerPage, searchValue)
         .then(
          objects => {
            this.objects = objects;
            this.isLoading = false;
          },
          err => this.isLoading = false
        );

      },
      err => console.log(err)
    );


  }


}
