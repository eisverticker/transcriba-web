import { Component, OnInit } from '@angular/core';

import { ScoreService } from './score.service';

@Component({
  selector: 'tr-hall-of-fame',
  template:
  `
  <div class="panel panel-default">
    <div class="panel-heading">
      Die besten Mitwirkenden auf Transcriba
    </div>
    <div class="panel-body">
      <ul class="list-group">
        <li *ngFor="let scorer of scorers" class="list-group-item">
          <span class="badge">
          <i class="fa fa-trophy fa-lg" aria-hidden="true"></i>
          {{ scorer.score }}
          </span>
          {{ scorer.username }}
        </li>
      </ul>
    </div>
  </div>
  `
})
export class HallOfFameComponent implements OnInit {

  scorers: Array<{username: string, score: number }>;

  constructor(
    private scoreService: ScoreService
  ) {}

  ngOnInit() {
    this.scoreService.loadBestScorers().then(
      scorers => this.scorers = scorers,
      err => console.log('we were not able to load hall of fame', err)
    );
  }

}
