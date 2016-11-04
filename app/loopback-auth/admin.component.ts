import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthService } from './auth.service';

import { User } from './user';

@Component({
  selector:    'auth-administration',
  template: `
  <h1>Administratorbereich</h1>
  <sub-navbar [items]="navItems"></sub-navbar>
  
  <div [ngSwitch]="mode">
    <be-patient *ngSwitchCase="'loading'"></be-patient>
    <user-management *ngSwitchCase="'user'"></user-management>
  </div>
  `,
  styleUrls: []
})
export class AdminComponent implements OnInit{
  mode: string = "loading";//(un)authorized, register and loading
  navItems: Array<any> = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private auth: AuthService
  ){}

  ngOnInit(){
    this.route.data.subscribe(
      data => {
        //useless at the moment
        this.mode = data['mode'];
      }
    );
    this.initNavigation();
  }

  private initNavigation(){

    this.navItems = [
      {
        name: "title.userManagement",
        route: '/admin'
      }
    ];

  }

}
