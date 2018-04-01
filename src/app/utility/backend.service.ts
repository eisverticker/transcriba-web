import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { environment } from '../../environments/environment';
import urlFactory from 'url-factory';

@Injectable()
export class BackendService {
  // FIXME remove error observable and methods if there is no use case
  public error: Observable<string>;
  private errorSubject: Subject<string> = new Subject<string>();
  private urlBuilder: any;

  constructor() {
    this.error = this.errorSubject.asObservable();
    // NOTE: urlBuilder was introduced with Transcriba2
    //  However, for compatibility reasons the old BackendService api was kept
    //  and thus the code became uglier
    let baseUrl = environment.backendApiUrl;
    if (baseUrl.charAt(baseUrl.length - 1) === '/') {
      baseUrl = baseUrl.substr(0, baseUrl.length - 1);
    }
    this.urlBuilder = urlFactory(baseUrl);
  }

  authUrl(ressourceUriPart: string, token: string, filter?: string | {[key: string]: string} ) {
    if (typeof filter === 'object') {
      return this.urlBuilder(
        ressourceUriPart,
        Object.assign({access_token: token}, filter)
      );
    }

    if (filter === undefined) {
      filter = '';
    } else {
      filter = '&' + filter;
    }
    return environment.backendApiUrl + ressourceUriPart + '?access_token=' + token + filter;
  }

  unAuthUrl(ressourceUriPart: string, filter?: string | {[key: string]: string}): string {
    if (typeof filter === 'object') {
      return this.urlBuilder(
        ressourceUriPart,
        filter
      );
    }

    if (filter === undefined) {
      filter = '';
    } else {
      filter = '?' + filter;
    }
    return environment.backendApiUrl + ressourceUriPart + filter;
  }

  /**
   * Propagate Connection Problem
   */
  connectionFailed() {
    this.errorSubject.next('unavailable');
  }

  /**
   * Propagate Authentication Problem
   */
  authenticationFailed() {
    this.errorSubject.next('unauthenticated');
  }

}
