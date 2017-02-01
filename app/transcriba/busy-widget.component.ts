import { Component, OnInit } from '@angular/core';

import { AuthService } from '../loopback-auth/auth.service';
import { TranscribaObject } from './transcriba-object';
import { BackendHelper } from '../utilities/backend-helper';
import { TranscribaService } from './transcriba.service';

@Component({
  selector: 'tr-busy-widget',
  template:
  `
    <div *ngIf="object" class="panel panel-primary">
      <div class="panel-heading">
        <span>Daran arbeitest du aktuell</span>
      </div>
      <div class="panel-body">
        <a class="thumbnail" [routerLink]="'/obj/'+object.id+'/transcribe'" class="btn btn-default">
          <img [src]="backend.unAuthUrl('TranscribaObjects/'+object.id+'/thumbnail')" alt="thumbnail">
        </a>
        <div class="caption">
          <p>{{ object.title }}</p>
        </div>
      </div>
    </div>
  `
})
export class BusyWidgetComponent implements OnInit {

  object: TranscribaObject;

  constructor(
    private auth: AuthService,
    private transcriba: TranscribaService,
    public backend: BackendHelper
  ) {}

  ngOnInit() {
    this.auth.loadUser().then(// load user to check if the user is registered
      user => {
        if (user.isRegistered()) {
          this.transcriba.isUserBusy().then(// check busy state
            isBusy => {
              if (isBusy) {
                this.transcriba.loadCurrentlyOccupiedObject().then(// load object if busy
                  object => this.object = object,
                  err => console.log(err)
                );
              }
            },
            err => console.log(err)
          );
        }
      },
      err => console.log(err)
    );
  }

}
