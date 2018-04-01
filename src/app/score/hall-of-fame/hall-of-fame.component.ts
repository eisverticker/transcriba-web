import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ScoreService } from '../score.service';
import { AuthService } from '../../loopback-auth/auth.service';
import { LoggerService } from '../../utility/logger.service';

import { User } from '../../loopback-auth/user';

@Component({
  selector: 'scr-hall-of-fame',
  templateUrl: './hall-of-fame.component.html',
  styleUrls: ['./hall-of-fame.component.scss']
})
export class HallOfFameComponent implements OnInit {
  private logger = LoggerService.getCustomLogger('HallOfFameComponent');

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
      error => this.logger.error('updateScorerList', error)
    );
  }

}
