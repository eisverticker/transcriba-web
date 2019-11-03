import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector:    'ut-be-patient',
  template:
  `
  <div *ngIf="isStarted" class="text-center">
    <fa-icon [icon]="['fas', 'spinner']" [pulse]="true"></fa-icon>
    <span class="sr-only">{{ 'message.pleaseWait' | translate }} yeah</span>
  </div>
  `,
  styleUrls: []
})
export class BePatientComponent implements OnInit {
  isStarted = false;

  ngOnInit() {
    // wait 200 ms before showing the template (less anoying)
    Observable.timer(200).subscribe(
      () => {
        this.isStarted = true;
      }
    );
  }
}
