import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'lauth-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  mode = 'loading'; // (un)authorized, register and loading
  navItems: Array<any> = [];

  constructor(
    private route: ActivatedRoute
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
