import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthService } from '../auth.service';

@Component({
  selector: 'lauth-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
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
