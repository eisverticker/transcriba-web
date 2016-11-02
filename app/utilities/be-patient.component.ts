import { Component, OnInit } from '@angular/core';

@Component({
  selector:    'be-patient',
  template:
  `
  {{ 'message.pleaseWait' | translate }}

  `,
  styleUrls: []
})
export class BePatientComponent implements OnInit{

  constructor(){

  }

  ngOnInit(){

  }

}
