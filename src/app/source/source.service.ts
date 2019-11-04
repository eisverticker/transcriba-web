import { BackendHelper } from '../utilities/backend-helper';
import { AuthService } from '../loopback-auth/auth.service';

import { Injectable } from '@angular/core';
import { Source } from './source';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class SourceService {

  constructor(
    private http: HttpClient,
    private backend: BackendHelper,
    private auth: AuthService
  ) {}

  async loadAllSources(): Promise<Source[]> {
    const token = this.auth.token;
    const url = this.backend.authUrl('Sources', token);

    const data = await this.http.get<any>(url)
      .toPromise();
    return data.map((s: any) => new Source(s.title, s.url, s.info_url, s.logo_url, s.api_type, s.sync, s.activated, s.id));
  }

  // deprecated (alias for loadByID)
  loadSourceByID(id: any): Promise<Source> {
    console.log('loadSourceByID ist deprecated, use loadByID instead');
    return this.loadByID(id);
  }

  async loadByID(id: any): Promise<Source> {
    const token = this.auth.token;
    const url = this.backend.authUrl('Sources/' + id, token);

    const s = await this.http.get<any>(url)
      .toPromise();
    return new Source(s.title, s.url, s.info_url, s.logo_url, s.api_type, s.sync, s.activated, s.id);
  }

  async loadSummaryByID(id: any): Promise<Source> {
    const token = this.auth.token;
    const url = this.backend.authUrl('Sources/' + id + '/summary', token);

    const s = await this.http.get<any>(url)
      .toPromise();
    return new Source(s.title, '', s.info_url, s.logo_url, '', false, false, s.id);
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

}
