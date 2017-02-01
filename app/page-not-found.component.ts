import { Component } from '@angular/core';

@Component({
  selector: 'tr-page-not-found',
  template: `
  <h1>{{ 'title.pageNotFound' | translate }}</h1>
  <p>{{ 'message.pageNotFound' | translate }}</p>
  `
})
export class PageNotFoundComponent {}
