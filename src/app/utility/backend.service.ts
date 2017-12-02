import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs/Rx';
import { environment } from '../../environments/environment';

@Injectable()
export class BackendService {
  // FIXME remove error observable and methods if there is no use case
  public error: Observable<string>;
  private errorSubject: Subject<string> = new Subject<string>();

  constructor() {
    this.error = this.errorSubject.asObservable();
  }

  authUrl(ressourceUri: string, token: string, filter?: string) {
    if (filter === undefined) {
      filter = '';
    }else {
      filter = '&' + filter;
    }
    return environment.backendApiUrl + ressourceUri + '?access_token=' + token + filter;
  }

  unAuthUrl(ressourceUri: string, filter?: string): string {
    if (filter === undefined) {
      filter = '';
    }else {
      filter = '?' + filter;
    }
    return environment.backendApiUrl + ressourceUri + filter;
  }

  /**
   * Propagate Connection Problem
   */
  connectionFailed(){
    this.errorSubject.next('unavailable')
  }

  /**
   * Propagate Authentication Problem
   */
  authenticationFailed(){
    this.errorSubject.next('unauthenticated');
  }

}
