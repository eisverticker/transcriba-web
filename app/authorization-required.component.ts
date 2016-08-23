import { Component, OnInit } from '@angular/core';

@Component({
  selector: '<page-not-found></page-not-found>',
  template: `
  <h1>{{ 'title.authorizationRequired' | translate }}</h1>
  <p>{{ 'message.notAccessable' | translate }}</p>
  `
})
export class AuthorizationRequiredComponent implements OnInit{
  constructor(){

  }

  ngOnInit(){

  }

}
