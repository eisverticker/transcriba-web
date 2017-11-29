import { Component, OnInit } from '@angular/core';

import { User } from '../loopback-auth/user';
import { AuthService } from '../loopback-auth/auth.service';

@Component({
  selector: 'tr-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  user: User;

  constructor(
    private auth: AuthService
  ) { }


  ngOnInit() {
    // watch whether user is logged in or not
    this.auth.user.subscribe(
      (user) => this.user = user
    );
    this.auth.loadUser().then(
      (user) => this.user = user
    );
  }

  isRegistered(): boolean {
    if (this.user && this.user.isRegistered()) {
      return true;
    }else {
      return false;
    }
  }

}
