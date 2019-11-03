import { Injectable } from '@angular/core';
import { BackendHelper } from '../utilities/backend-helper';
import { AuthService } from '../loopback-auth/auth.service';

import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { timeout } from 'rxjs/operators';

// import { AuthAction } from './auth-action';

@Injectable()
export class ScoreService {
  public score: Observable<number>;
  private scoreSubject: BehaviorSubject<number>;

  constructor(
    private http: HttpClient,
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
  async loadScore(): Promise<number> {
    let token = this.auth.token;
    let url = this.backend.authUrl('AppUsers/score', token);
    return this.http.get<number>(url).pipe(timeout(5000))
      .toPromise();
  }

  /**
   *
   */
  loadBestScorers(maxNumOfUsers = 10): Promise<{username: string, score: number}[]> {
        let token = this.auth.token;
        let url = this.backend.authUrl('AppUsers/leaderboard', token);

        return this.http.get<any>(url)
        .pipe(
          timeout(5000)
        )
        .toPromise();
  }

}
