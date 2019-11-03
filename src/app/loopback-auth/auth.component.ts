import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthService } from './auth.service';

import { User } from './user';

@Component({
  selector:    'usr-auth',
  template:
  `
  <div [ngSwitch]="mode">
    <ut-be-patient *ngSwitchCase="'loading'"></ut-be-patient>
    <usr-login (done)="finishLogin()" *ngSwitchCase="'unauthenticated'"></usr-login>
    <usr-logout (done)="finishLogout()" *ngSwitchCase="'authenticated'"></usr-logout>
    <usr-registration (done)="finishRegistration()" *ngSwitchCase="'register'"></usr-registration>
    <usr-email-verification *ngSwitchCase="'verify'"></usr-email-verification>
    <usr-password-reset (done)="finishReset()" *ngSwitchCase="'reset'"></usr-password-reset>
  </div>

  `,
  styleUrls: []
})
export class AuthComponent implements OnInit {
  public mode = 'loading'; // (un)authorized, register and loading

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private auth: AuthService
  ) {}

  ngOnInit() {
    this.route.data.subscribe(
      data => {
        this.auth.loadUser().then(
          (user) => {
            if (User.isGuest(user)) {
              if ( data['mode'] === 'register' ) {
                this.mode = 'register';
              }else if (data['mode'] === 'reset') {
                this.mode = 'reset';
              }else {
                this.mode = 'unauthenticated';
              }
            }else {
              this.mode = 'authenticated';
            }
          }
        );
      }
    );
  }

  finishLogin() {
    this.mode = 'authenticated';
    this.router.navigate(['']);
  }

  finishLogout() {
    this.mode = 'unauthenticated';
  }

  finishRegistration() {
    this.mode = 'verify';
  }

  finishReset() {
    this.router.navigate(['login']);
  }

}
