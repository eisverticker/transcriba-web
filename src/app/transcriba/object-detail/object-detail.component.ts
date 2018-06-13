import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { TranscribaObject } from '../transcriba-object';
import { TranscribaService } from '../transcriba.service';
import { zip } from 'rxjs/observable/zip';
import { LoggerService } from '../../utility/logger.service';
import { map } from 'rxjs/operators';
import { Params } from '@angular/router';
import { Data } from '@angular/router';

@Component({
  selector: 'tr-object-detail',
  templateUrl: './object-detail.component.html',
  styleUrls: ['./object-detail.component.scss']
})
export class ObjectDetailComponent implements OnInit {
  static logger = LoggerService.getCustomLogger(ObjectDetailComponent.name);

  object: TranscribaObject;
  navItems: Array<any> = [];
  mode: string;
  currentTab = 0;

  constructor(
    private transcribaService: TranscribaService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    zip(
      [
        this.route.params,
        this.route.data
      ]
    ).pipe(
      map(
        (routePair) => ({params: routePair[0], data: routePair[1]})
      )
    ).subscribe(
      (route) => {
        ObjectDetailComponent.logger.info('Route' + JSON.stringify(route));
        const id = route.params['id'];

        // load object
        this.transcribaService.loadByID(id).then(
          obj => {
            this.mode = route.data['mode'];
            this.object = obj;

            switch (this.mode) {
              case 'viewer':
               this.currentTab = 4;
               break;
            }
          },
          err => ObjectDetailComponent.logger.error('ObjectDetailComponent', err)
        );
      }
    );
  }
}
