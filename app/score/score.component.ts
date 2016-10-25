import { Component, OnInit } from '@angular/core';

import { ScoreService } from './score.service';

@Component({
  selector: 'score-value',
  template: '<span *ngIf="score">{{ score }}</span>'
})
export class ScoreComponent implements OnInit{

  score: number;

  constructor(
    private scoreService: ScoreService
  ){}

  ngOnInit(){
    this.scoreService.loadScore().then(
      score => this.score = score,
      err => console.log("we were not able to load score", err)
    );
  }

}
