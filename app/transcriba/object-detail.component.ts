import { Component, OnInit} from '@angular/core';

import { TranscribaObject } from './transcriba-object';
import { TranscribaService } from './transcriba.service';
import { NotificationService } from '../utilities/notification.service';
import { Notification } from '../utilities/notification';

import { ActivatedRoute, Router } from '@angular/router';

import { AuthService } from '../loopback-auth/auth.service';
import { DiscussionService } from '../discussion/discussion.service';
import { BackendHelper } from '../utilities/backend-helper';

import { Discussion } from '../discussion/discussion';
import { User } from '../loopback-auth/user';

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

  constructor(
    private transcriba: TranscribaService,
    private notify: NotificationService,
    private route: ActivatedRoute,
    private router: Router,
    private discussionService: DiscussionService,
    private auth: AuthService,
    private backend: BackendHelper
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

            if(this.mode == 'discussion'){
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
