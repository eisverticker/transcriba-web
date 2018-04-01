import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../loopback-auth/auth.service';
import { ScoreService } from '../score.service';
import { NotificationService } from '../../utility/notification.service';
import { Notification } from '../../utility/notification';

import { Observable } from 'rxjs/Observable';
import { Score } from '../score';

@Component({
  selector: 'scr-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.scss']
})
export class ScoreComponent implements OnInit {

  score: Observable<Score | boolean>;

  constructor(
    private scoreService: ScoreService,
    private notifier: NotificationService,
    private auth: AuthService
  ) {}

  ngOnInit() {
    this.score = this.scoreService.score;
    this.scoreService.startIntervalTimer();
    this.score.subscribe(
      (score) => {
        if (typeof score === 'boolean') { return; }
        if (score.hasChanged) {
          this.notifier.notify(Notification.message(score.delta.toString()));
        }
      }
    );
  }
}
