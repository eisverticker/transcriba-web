import { Component, OnInit } from '@angular/core';

@Component({
  moduleId:     module.id,
  selector:    'email-verification',
  template:
  `
  <div class="jumbotron">
    <h1>{{'title.eMailConfirmation' | translate }}</h1>
    <p>
      {{ 'command.pleaseVerifyYourEMailAccount' | translate }}
    </p>
  </div>
  `,
  styleUrls: []
})
export class VerifyComponent{
  constructor(){}

  ngOnInit(){

  }
}
