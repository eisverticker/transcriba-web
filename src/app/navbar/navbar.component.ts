import { Component, OnInit } from '@angular/core';

import { User } from '../loopback-auth/user';
import { AuthService } from '../loopback-auth/auth.service';

@Component({
  selector: 'tr-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
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
}
