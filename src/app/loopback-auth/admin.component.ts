import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthService } from './auth.service';

@Component({
  selector:    'usr-auth-administration',
  template: `
  <h1>Administratorbereich</h1>
  <ut-sub-navbar [items]="navItems"></ut-sub-navbar>

  <div [ngSwitch]="mode">
    <ut-be-patient *ngSwitchCase="'loading'"></ut-be-patient>
    <usr-management *ngSwitchCase="'user'"></usr-management>
  </div>
  `,
  styleUrls: []
})
export class AdminComponent implements OnInit {
  mode = 'loading'; // (un)authorized, register and loading
  navItems: Array<any> = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private auth: AuthService
  ) {}

  ngOnInit() {
    this.route.data.subscribe(
      data => {
        // useless at the moment
        this.mode = data['mode'];
      }
    );
    this.initNavigation();
  }

  private initNavigation() {

    this.navItems = [
      {
        name: 'title.userManagement',
        route: '/admin'
      }
    ];

  }

}
