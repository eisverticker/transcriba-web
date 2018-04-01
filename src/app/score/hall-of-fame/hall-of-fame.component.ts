import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ScoreService } from '../score.service';
import { User } from '../../loopback-auth/user';
import { AuthService } from '../../loopback-auth/auth.service';

@Component({
  selector: 'scr-hall-of-fame',
  templateUrl: './hall-of-fame.component.html',
  styleUrls: ['./hall-of-fame.component.scss']
})
export class HallOfFameComponent implements OnInit {

  scorers: Array<{username: string, score: number }>;
  user: Observable<User>;

  constructor(
    private scoreService: ScoreService,
    private authService: AuthService
  ) {
    this.user = this.authService.user;
  }

  ngOnInit() {
    this.user.subscribe(
      (user) => this.updateScorerList(user)
    );
  }

  private updateScorerList(user: User): Promise<any> {
    return this.scoreService.loadBestScorers().then(
      scorers => this.scorers = scorers,
      err => console.log('we were not able to load hall of fame', err)
    );
  }

}
