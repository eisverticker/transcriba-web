import { Component } from '@angular/core';
import { OnInit } from '@angular/core';

import { User } from './loopback-auth/user';
import { AuthService } from './loopback-auth/auth.service';

@Component({
  selector: 'tr-general-dashboard',
  templateUrl: 'dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  user: User;

  constructor(
    private auth: AuthService
  ) {}

  ngOnInit() {
    this.auth.loadUser().then(
      user => this.user = user,
      err => console.log(err)
    );
  }

}
