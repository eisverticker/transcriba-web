import { Component, OnInit} from '@angular/core';

import { TranscribaObject } from './transcriba-object';
import { Revision } from './revision';
import { TranscribaService } from './transcriba.service';
import { NotificationService } from '../utilities/notification.service';
import { Notification } from '../utilities/notification';

import { ActivatedRoute, Router } from '@angular/router';

import { AuthService } from '../loopback-auth/auth.service';
import { DiscussionService } from '../discussion/discussion.service';
import { SourceService } from '../source/source.service';
import { BackendHelper } from '../utilities/backend-helper';

import { Discussion } from '../discussion/discussion';
import { User } from '../loopback-auth/user';
import { Source } from '../source/source';

import { Observable } from 'rxjs/Rx';

@Component({
  moduleId:     module.id,
  selector:    'object-detail',
  templateUrl: 'object-detail.component.html',
  styleUrls: []
})
export class ObjectDetailComponent implements OnInit{

  object: TranscribaObject;
  navItems: Array<any> = [];
  mode: string;
  discussion: Discussion;
  user: User;
  source: Source;
  contents: Array<any>;
  chronic: Array<{id: string, userName: string, date: string}>;

  constructor(
    private transcriba: TranscribaService,
    private notify: NotificationService,
    private route: ActivatedRoute,
    private router: Router,
    private discussionService: DiscussionService,
    private auth: AuthService,
    private backend: BackendHelper,
    private sourceService: SourceService
  ){

  }

  ngOnInit(){
    Observable.zip(
      this.route.params,
      this.route.data,
      function(params, data){
        return {
          "params": params,
          "data": data
        }
      }
    ).subscribe( d => {
      let id = d.params['id'];
      this.mode = d.data['mode'];
      this.transcriba.loadByID(id).then(
          obj => {
            this.initNavigation(obj);
            this.object = obj;

            if(this.mode == 'overview'){
              this.sourceService.loadByID(obj.sourceID).then(
                source => this.source = source,
                err => console.log("error", err)
              );
            }

            if(this.mode == 'transcription'){
              console.log("transcription");
              this.transcriba.loadRevision(obj.id).then(
                rev => this.contents = [rev.content],
                err => console.log("can't load revision data", err)
              );
            }

            if(this.mode == 'chronic'){
              this.transcriba.loadChronic(obj.id).then(
                chronic => this.chronic = chronic,
                err => console.log("failed to load chronic", err)
              );
            }

            if(this.mode == 'discussion' || this.mode == 'overview'){
              this.discussionService.loadByID(obj.discussionID).then(
                (discussion) => {
                  this.discussion = discussion;
                  this.auth.loadUser().then( user => this.user = user );
                },
                err => console.log(err)
              );
            }
          }
      );
    });

  }


  private initNavigation(obj: TranscribaObject){

    this.navItems = [
      {
        name: "general.overview",
        route: '/obj/'+obj.id
      },
      {
        name: "general.transcription",
        route: '/obj/'+obj.id+'/transcribe'
      },
      {
        name: "general.discussion",
        route: '/obj/'+obj.id+'/discussion'
      },
      {
        name: "general.viewer",
        route: '/obj/'+obj.id+'/viewer'
      },
      {
        name: "general.versionHistory",
        route: '/obj/'+obj.id+'/chronic'
      },
      {
        name: "general.metadata",
        route: '/obj/'+obj.id+'/meta'
      }
    ];

  }


}
