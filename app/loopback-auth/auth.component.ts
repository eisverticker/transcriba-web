import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthService } from './auth.service';

import { User } from './user';

@Component({
  selector:    'user-auth',
  template:
  `
  <div [ngSwitch]="mode">
    <be-patient *ngSwitchCase="'loading'"></be-patient>
    <user-login (done)="finishLogin()" *ngSwitchCase="'unauthenticated'"></user-login>
    <user-logout (done)="finishLogout()" *ngSwitchCase="'authenticated'"></user-logout>
    <user-registration (done)="finishRegistration()" *ngSwitchCase="'register'"></user-registration>
    <email-verification *ngSwitchCase="'verify'"></email-verification>
    <password-reset (done)="finishReset()" *ngSwitchCase="'reset'"></password-reset>
  </div>

  `,
  styleUrls: []
})
export class AuthComponent implements OnInit{
  public mode: string = "loading";//(un)authorized, register and loading

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private auth: AuthService
  ){}

  ngOnInit(){
    this.route.data.subscribe(
      data => {
        this.auth.loadUser().then(
          (user) => {
            if(User.isGuest(user)){
              if( data['mode'] === "register" ){
                this.mode = "register";
              }else if(data['mode'] === "reset"){
                this.mode = "reset";
              }else{
                this.mode = "unauthenticated";
              }
            }else{
              this.mode = "authenticated";
            }
          }
        );
      }
    );
  }

  finishLogin(){
    this.mode = "authenticated";
    this.router.navigate(['']);
  }

  finishLogout(){
    this.mode = "unauthenticated";
  }

  finishRegistration(){
    this.mode = "verify";
  }

  finishReset(){
    this.router.navigate(['login']);
  }

}
