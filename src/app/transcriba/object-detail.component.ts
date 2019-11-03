import { Component, OnInit } from '@angular/core';

import { TranscribaObject } from './transcriba-object';
import { TranscribaService } from './transcriba.service';
import { TranscriptionService } from './transcription.service';
import { RevisionVotingService } from './revision-voting.service';
import { NotificationService } from '../utilities/notification.service';

import { ActivatedRoute, Router } from '@angular/router';

import { AuthService } from '../loopback-auth/auth.service';
import { DiscussionService } from '../discussion/discussion.service';
import { SourceService } from '../source/source.service';
import { BackendHelper } from '../utilities/backend-helper';

import { Observable } from 'rxjs';

@Component({
  moduleId:     module.id,
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
    private transcription: TranscriptionService,
    private notify: NotificationService,
    private route: ActivatedRoute,
    private router: Router,
    private discussionService: DiscussionService,
    private auth: AuthService,
    private backend: BackendHelper,
    private sourceService: SourceService,
    private voting: RevisionVotingService
  ) {

  }

  ngOnInit() {
    Observable.zip(
      this.route.params,
      this.route.data,
      function(params, data){
        return {
          'params': params,
          'data': data
        };
      }
    ).subscribe( d => {
      let id = d.params['id'];

      // load object
      this.transcriba.loadByID(id).then(
          obj => {
            this.mode = d.data['mode'];
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
