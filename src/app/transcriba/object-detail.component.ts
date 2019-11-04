import { Component, OnInit } from '@angular/core';
import { TranscribaObject } from './transcriba-object';
import { TranscribaService } from './transcriba.service';
import { ActivatedRoute } from '@angular/router';
import { zip } from 'rxjs';

@Component({
  selector:    'tr-object-detail',
  templateUrl: 'object-detail.component.html',
  styleUrls: []
})
export class ObjectDetailComponent implements OnInit {

  object: TranscribaObject;
  navItems: Array<any> = [];
  mode: string;

  constructor(
    private transcriba: TranscribaService,
    private route: ActivatedRoute,
  ) {

  }

  ngOnInit() {
    zip([this.route.params, this.route.data])
    .subscribe( ([params, data]) => {
      this.transcriba.loadByID(params['id']).then(
          obj => {
            this.mode = data['mode'];
            this.initNavigation(obj);
            this.object = obj;
          },
          err => console.log('cannot load object', err)
      );
    });

  }

  private initNavigation(obj: TranscribaObject) {

    this.navItems = [
      {
        name: 'general.overview',
        route: '/obj/' + obj.id
      },
      {
        name: 'general.transcription',
        route: '/obj/' + obj.id + '/transcribe'
      },
      {
        name: 'general.discussion',
        route: '/obj/' + obj.id + '/discussion'
      },
      {
        name: 'general.viewer',
        route: '/obj/' + obj.id + '/viewer'
      },
      {
        name: 'general.versionHistory',
        route: '/obj/' + obj.id + '/chronic'
      }/*,
      {
        name: "general.metadata",
        route: '/obj/'+obj.id+'/meta'
      }*/
    ];

  }


}
