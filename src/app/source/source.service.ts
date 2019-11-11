import { HttpClient } from '@angular/common/http';
import { BackendService } from '../utility/backend.service';
import { AuthService } from '../loopback-auth/auth.service';

import { Injectable } from '@angular/core';
import { Source } from './source';

import { map } from 'rxjs/operators/map';

@Injectable()
export class SourceService {

  constructor(
    private http: HttpClient,
    private backend: BackendService,
    private auth: AuthService
  ) {}

  loadAllSources(): Promise<Source[]> {
    const token = this.auth.token;
    const url = this.backend.authUrl('Sources', token);

    return this.http.get<Array<any>>(url)
    .pipe(
      map(
        (data) => data.map(
          s => new Source(
            s.title,
            s.url,
            s.info_url,
            s.logo_url,
            s.api_type,
            s.sync,
            s.activated,
            s.id
          )
        )
      )
    )
    .toPromise();
  }

  loadByID(id: any): Promise<Source> {
    const token = this.auth.token;
    const url = this.backend.authUrl('Sources/' + id, token);

    return this.http.get(url)
    .pipe(
      map(
        s => new Source(
          s['title'],
          s['url'],
          s['info_url'],
          s['logo_url'],
          s['api_type'],
          s['sync'],
          s['activated'],
          s['id']
        )
      )
    )
    .toPromise();
  }

  loadSummaryByID(id: any): Promise<Source> {
    const token = this.auth.token;
    const url = this.backend.authUrl('Sources/' + id + '/summary', token);

    return this.http.get(url)
    .pipe(
      map(
        s => new Source(
          s['title'],
          '',
          s['info_url'],
          s['logo_url'],
          '',
          false,
          false,
          s['id']
        )
      )
    )
    .toPromise();
  }

  save(source: Source): Promise<any> {
    const token = this.auth.token;
    let url: string;

    if (source.id === undefined) {
      url = this.backend.authUrl('Sources', token);
    } else {
      url = this.backend.authUrl('Sources/' + source.id, token);
    }

    const data = {
      'title': source.title,
      'url': source.url,
      'info_url': source.info_url,
      'logo_url': source.logo_url,
      'api_type': source.type,
      'sync': source.sync,
      'activated': source.activated
    };

    return this.http.put(url, data)
    .toPromise();
  }

  /**
   * Load API information of an external manuscript source
   */
   loadMetadata(url: string): Promise<Source> {
     const token = this.auth.token;
     const requestUrl = this.backend.authUrl('Sources/metadata', token, {
       'url': url
     });

     return this.http.get(requestUrl)
     .pipe(
       map(
         o => new Source(
           o['name'], // title
           o['manuscriptUrl'], // url
           o['linkUrl'], // info_url
           '', // logo_url
           'TranscribaJSON', // type
           o['capabilities']['synchronisation'], // sync
           true // activated
         )
       )
     )
     .toPromise();
   }

}
