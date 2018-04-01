import { Component, OnInit } from '@angular/core';

import { TranscribaObject } from '../transcriba-object';
import { TranscribaService } from '../transcriba.service';
import { TranscriptionService } from '../transcription.service';
import { RevisionVotingService } from '../revision-voting.service';
import { NotificationService } from '../../utility/notification.service';

import { ActivatedRoute, Router } from '@angular/router';

import { AuthService } from '../../loopback-auth/auth.service';
import { DiscussionService } from '../../discussion/discussion.service';
import { SourceService } from '../../source/source.service';
import { BackendService } from '../../utility/backend.service';

import { Observable } from 'rxjs/Observable';
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
    private transcriba: TranscribaService,
    private transcription: TranscriptionService,
    private notify: NotificationService,
    private route: ActivatedRoute,
    private router: Router,
    private discussionService: DiscussionService,
    private auth: AuthService,
    private backend: BackendService,
    private sourceService: SourceService,
    private voting: RevisionVotingService
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
      console.log('object-detail', 'params have changed');
      const id = d.params['id'];

      // load object
      this.transcriba.loadByID(id).then(
          obj => {
            this.mode = d.data['mode'];
            this.object = obj;

            switch (this.mode) {
              case 'viewer':
               this.currentTab = 4;
               break;
            }
          },
          err => console.log('cannot load object', err)
      );
    });

  }


}
