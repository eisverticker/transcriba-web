import { Component, OnInit } from '@angular/core';

import { TranscribaObject } from '../transcriba-object';
import { TranscribaService } from '../transcriba.service';

import { ActivatedRoute } from '@angular/router';

import { LoggerService } from '../../utility/logger.service';

import { zip } from 'rxjs/observable/zip';

@Component({
  selector: 'tr-object-detail',
  templateUrl: './object-detail.component.html',
  styleUrls: ['./object-detail.component.scss']
})
export class ObjectDetailComponent implements OnInit {

  object: TranscribaObject;
  navItems: Array<any> = [];
  mode: string;
  currentTab = 0;

  constructor(
    private transcribaService: TranscribaService,
    private route: ActivatedRoute,
    private logger: LoggerService
  ) {

  }

  ngOnInit() {
    zip(
      this.route.params,
      this.route.data,
      function(params, data) {
        return {
          'params': params,
          'data': data
        };
      }
    ).subscribe( d => {
      const id = d.params['id'];

      // load object
      this.transcribaService.loadByID(id).then(
          obj => {
            this.mode = d.data['mode'];
            this.object = obj;

            switch (this.mode) {
              case 'viewer':
               this.currentTab = 4;
               break;
            }
          },
          err => this.logger.log('ObjectDetailComponent', err)
      );
    });

  }


}
