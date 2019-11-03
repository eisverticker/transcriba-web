import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { BackendHelper } from '../utilities/backend-helper';
import { AuthService } from '../loopback-auth/auth.service';

import { Observable, BehaviorSubject } from 'rxjs/Rx';

// import { AuthAction } from './auth-action';

@Injectable()
export class ScoreService {
  public score: Observable<number>;
  private scoreSubject: BehaviorSubject<number>;

  constructor(
    private http: Http,
    private backend: BackendHelper,
    private auth: AuthService
  ) {
    // Initalize Reactive Components (Observables)
    this.scoreSubject = new BehaviorSubject(-1);
    this.score = this.scoreSubject.asObservable();
  }

  /**
   * Loads score value of currently logged in user
   */
  loadScore(): Promise<number> {
    return this.auth.loadUser().then(
      (user) => {
        let token = this.auth.token;
        let url = this.backend.authUrl('AppUsers/score', token);

        return this.http.get(url)
        .timeout(5000)
        .map(data => data.json())
        .toPromise();
      }
    );
  }

  /**
   *
   */
  loadBestScorers(maxNumOfUsers = 10): Promise<{username: string, score: number}[]> {
        let token = this.auth.token;
        let url = this.backend.authUrl('AppUsers/leaderboard', token);

        return this.http.get(url)
        .timeout(5000)
        .map(data => data.json())
        .toPromise();
  }

}
