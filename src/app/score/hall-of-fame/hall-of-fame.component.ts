import { Component, OnInit } from '@angular/core';

import { ScoreService } from '../score.service';

@Component({
  selector: 'scr-hall-of-fame',
  templateUrl: './hall-of-fame.component.html',
  styleUrls: ['./hall-of-fame.component.scss']
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
