import { Component, OnInit } from '@angular/core';

import { ScoreService } from './score.service';
import { AuthService } from '../loopback-auth/auth.service';
import { NotificationService } from '../utilities/notification.service';
import { Notification } from '../utilities/notification';

import { Observable } from 'rxjs';

@Component({
  selector: 'tr-score-value',
  template: '<span *ngIf="score != undefined">{{ score }}</span>'
})
export class ScoreComponent implements OnInit {

  score: number;

  constructor(
    private scoreService: ScoreService,
    private notifier: NotificationService,
    private auth: AuthService
  ) {}

  ngOnInit() {
    this.loadScore();
    const scoreWatcher = Observable.interval(10000) // ms
      .timeInterval()
      .subscribe(
        () => this.loadScore(),
        (err) => console.log(err)
      );
    this.auth.user.subscribe(
      user => {
        this.score = undefined;
      }
    );
  }

  loadScore() {
    if (!this.auth.token) {
      return;
    }

    this.scoreService.loadScore().then(
      score => {
        if (this.score === undefined) {
          this.score = score;
        } else if (this.score < score) {
          this.notifier.notify(new Notification('+ ' + (score - this.score), ['success', 'untranslated']));
          this.score = score;
        } else if (this.score > score) {
          this.notifier.notify(new Notification('- ' + (score - this.score), ['fail', 'untranslated']));
          this.score = score;
        }
      },
      err => {
        console.log('we were not able to load score', err);
      }
    );
  }

}
