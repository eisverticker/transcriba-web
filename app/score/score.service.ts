import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { BackendHelper } from '../utilities/backend-helper';

import { Observable, Subject, BehaviorSubject } from 'rxjs/Rx';

//import { AuthAction } from './auth-action';

@Injectable()
export class ScoreService{
  private scoreSubject: BehaviorSubject<number>;
  public score: Observable<number>;

  constructor(
    private http: Http,
    private backend: BackendHelper
  ){
    //Initalize Reactive Components (Observables)
    this.scoreSubject = new BehaviorSubject(-1);
    this.score = this.scoreSubject.asObservable();
  }

  /**
   * Loads score value of currently logged in user
   */
  loadScore(): Promise<number>{
    return Promise.resolve(50);
  }

  /**
   *
   */
  loadBestScorers(maxNumOfUsers: number = 10): Promise<{name: string, score: number}[]>{
      return Promise.resolve(
        [
          {
            name: "tester",
            score: 20
          }
        ]
      );
  }

}
