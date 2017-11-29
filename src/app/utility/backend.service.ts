import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';

@Injectable()
export class BackendService {
  constructor() {}

  public authUrl(ressourceUri: string, token: string, filter?: string) {
    if (filter === undefined) {
      filter = '';
    }else {
      filter = '&' + filter;
    }
    return environment.backendApiUrl + ressourceUri + '?access_token=' + token + filter;
  }

  public unAuthUrl(ressourceUri: string, filter?: string): string {
    if (filter === undefined) {
      filter = '';
    }else {
      filter = '?' + filter;
    }
    return environment.backendApiUrl + ressourceUri + filter;
  }

}
