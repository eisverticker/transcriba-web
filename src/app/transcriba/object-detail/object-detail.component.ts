import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { TranscribaObject } from '../transcriba-object';
import { TranscribaService } from '../transcriba.service';
import { zip } from 'rxjs/observable/zip';
import { LoggerService } from '../../utility/logger.service';

@Component({
  selector: 'tr-object-detail',
  templateUrl: './object-detail.component.html',
  styleUrls: ['./object-detail.component.scss']
})
export class ObjectDetailComponent implements OnInit {
  static logger = LoggerService.getCustomLogger(ObjectDetailComponent.name);
  static DISCUSSION_MAX_NUM_OF_ITEMS_PER_PAGE = 10;

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
        this.route.params,
        this.route.data
    ).subscribe(
      (route) => {
        if (route.length !== 2) {
          throw new Error('invalid argument exception');
        }
        const params = route[0];
        const routeData = route[1];
        const id = params['id'];

        // load object
        this.transcribaService.loadByID(id).then(
          obj => {
            this.mode = routeData['mode'];
            this.object = obj;
            ObjectDetailComponent.logger.info(
              'Transcriba-Object loaded:' + JSON.stringify(obj)
            );

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
