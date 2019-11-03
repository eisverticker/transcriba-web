import { Injectable } from '@angular/core';

import { ConfigurationService } from '../config/configuration.service';

@Injectable()
export class BackendHelper {
  constructor(
    private config: ConfigurationService
  ) {}

  public authUrl(ressourceUri: string, token: string, filter?: string) {
    if (filter === undefined) {
      filter = '';
    }else {
      filter = '&' + filter;
    }
    return this.config.get('backendApiUrl', 'http://localhost:3001/api/') + ressourceUri + '?access_token=' + token + filter;
  }

  public unAuthUrl(ressourceUri: string, filter?: string): string {
    if (filter === undefined) {
      filter = '';
    }else {
      filter = '?' + filter;
    }
    return this.config.get('backendApiUrl', 'http://localhost:3001/api/') + ressourceUri + filter;
  }

}
