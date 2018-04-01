import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BackendService } from '../utility/backend.service';
import { AuthService } from '../loopback-auth/auth.service';
import { User } from '../loopback-auth/user';
import { Score } from './score';

import { Notification } from '../utility/notification';
import { NotificationService } from '../utility/notification.service';

import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subscription } from 'rxjs/Subscription';
import { interval } from 'rxjs/observable/interval';
import { timeout } from 'rxjs/operators/timeout';

class UserScore {
  username: string;
  score: number;
}

@Injectable()
export class ScoreService {
  public static readonly timeout = 5000;

  score: Observable<Score | boolean>;
  user: Observable<User>;
  private scoreSubject: BehaviorSubject<Score | boolean>;
  lastScore: number; // init in reset()
  isIntervalStarted = false;
  intervalSubscription: Subscription | null = null;

  constructor(
    private http: HttpClient,
    private backend: BackendService,
    private auth: AuthService,
    private notificationService: NotificationService
  ) {
    // init by reset
    this.reset();

    // Initalize Reactive Components (Observables)
    this.scoreSubject = new BehaviorSubject(false);
    this.score = this.scoreSubject.asObservable();
    this.user = this.auth.user;

    // react when the user changes
    this.user.subscribe(
      (user) => {
        if (user.isRegistered()) {
          this.updateScore();
        } else {
          this.reset();
          this.scoreSubject.next(false);
        }
      }
    );

  }

  reset() {
    this.lastScore = -1;
    if (this.intervalSubscription != null) {
      this.intervalSubscription.unsubscribe();
    }
  }

  startIntervalTimer() {
    // only start timer once
    if (this.isIntervalStarted) { return; }

    this.isIntervalStarted = true;
    this.intervalSubscription = interval(20000).subscribe(
      () => this.updateScore()
    );
  }

  updateScore() {
    this.loadScore().then(
      (scoreResult) => {
        // case 1: first publish
        if (this.lastScore === -1) {
          this.scoreSubject.next({
            value: scoreResult,
            hasChanged: false,
            delta: 0
          });
        }

        // case 2: publish on change
        if (scoreResult !== this.lastScore && this.lastScore !== -1) {
            this.scoreSubject.next({
              value: scoreResult,
              hasChanged: true,
              delta: scoreResult - this.lastScore
            });
        }
        this.lastScore = scoreResult;
      },
      (err) => {
        // notify the user about an error
        this.notificationService.notify(Notification.timeout());
      }
    );
  }

  /**
   * Loads score value of currently logged in user
   */
  loadScore(): Promise<number> {
    return this.auth.loadUser().then(
      (user) => {
        const token = this.auth.token;
        const url = this.backend.authUrl('AppUsers/score', token);

        return this.http.get<number>(url)
        .pipe(timeout(ScoreService.timeout))
        .toPromise();
      }
    );
  }

  /**
   * Get Users which are in the leaderboard and their score
   */
  loadBestScorers(maxNumOfUsers = 10): Promise<UserScore[]> {
        const token = this.auth.token;
        const url = this.backend.authUrl('AppUsers/leaderboard', token);

        return this.http.get<UserScore[]>(url)
        .pipe(timeout(ScoreService.timeout))
        .toPromise();
  }

}
