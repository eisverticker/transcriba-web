import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthService } from './auth.service';

import { User } from './user';

@Component({
  moduleId:     module.id,
  selector:    'user-auth',
  templateUrl: 'auth.component.html',
  styleUrls: [],
  providers: []
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
        this.auth.isInitialized.subscribe(
          isInitialized => {
            if(isInitialized){
              let user = this.auth.getActiveUser();
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
