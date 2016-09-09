import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthService } from './auth.service';

import { User } from './user';

@Component({
  moduleId:     module.id,
  selector:    'auth-administration',
  templateUrl: 'admin.component.html',
  styleUrls: []
})
export class AdminComponent implements OnInit{
  public mode: string = "loading";//(un)authorized, register and loading

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private auth: AuthService
  ){}

  ngOnInit(){
    this.route.data.subscribe(
      data => {
        //useless at the moment
        this.mode = "userManagement"
      }
    );
  }

}
