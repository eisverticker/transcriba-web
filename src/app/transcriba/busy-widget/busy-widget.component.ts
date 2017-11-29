import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../loopback-auth/auth.service';
import { TranscribaObject } from '../transcriba-object';
import { BackendService } from '../../utility/backend.service';
import { TranscribaService } from '../transcriba.service';

@Component({
  selector: 'tr-busy-widget',
  templateUrl: './busy-widget.component.html',
  styleUrls: ['./busy-widget.component.scss']
})
export class BusyWidgetComponent implements OnInit {

  object: TranscribaObject;

  constructor(
    private auth: AuthService,
    private transcriba: TranscribaService,
    public backend: BackendService
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
