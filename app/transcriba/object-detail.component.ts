import { Component, OnInit } from '@angular/core';

import { TranscribaObject } from './transcriba-object';
import { TranscribaService } from './transcriba.service';
import { NotificationService } from '../utilities/notification.service';
import { Notification } from '../utilities/notification';

import { ActivatedRoute, Router } from '@angular/router';

import { AuthService } from '../loopback-auth/auth.service';
import { DiscussionService } from '../discussion/discussion.service';

import { Discussion } from '../discussion/discussion';
import { User } from '../loopback-auth/user';


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
    private auth: AuthService
  ){

  }

  ngOnInit(){
    this.route.params.subscribe( params => {
      this.route.data.subscribe( data => {
        let id = params['id'];
        this.mode = data['mode'];
        this.transcriba.loadByID(id).then(
            obj => {
              this.initNavigation(obj);
              this.object = obj;

              if(this.mode == 'discussion'){
                this.discussionService.loadByID(obj.discussionID).then(
                  (discussion) => {
                    this.discussion = discussion;
                    this.auth.loadUser().then( user => this.user = user );
                  }
                )
              }
            }
        );
      });
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
      }
    ];

  }


}
