import { Component, OnInit } from '@angular/core';

@Component({
  selector: '<page-not-found></page-not-found>',
  template: `
  <h1>{{ 'title.pageNotFound' | translate }}</h1>
  <p>{{ 'message.pageNotFound' | translate }}</p>
  `
})
export class PageNotFoundComponent implements OnInit{
  constructor(){

  }

  ngOnInit(){

  }

}
