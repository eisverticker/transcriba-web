import { Component} from '@angular/core';

@Component({
  selector: 'tr-auth-required',
  template: `
  <h1>{{ 'title.authorizationRequired' | translate }}</h1>
  <p>{{ 'message.notAccessable' | translate }}</p>
  `
})
export class AuthorizationRequiredComponent {}
