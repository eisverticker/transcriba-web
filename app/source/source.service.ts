import { Http } from '@angular/http';
import { BackendHelper } from '../utilities/backend-helper';
import { AuthService } from '../loopback-auth/auth.service';

import { Injectable } from '@angular/core';
import { Source } from './source';

@Injectable()
export class SourceService{

  constructor(
    private http: Http
    private backend: BackendHelper,
    private auth: AuthService
  ){}

  loadAllSources(): Promise<Source[]>{
    let token = this.auth.token;
    let url = this.backend.authUrl('Sources', token);

    return this.http.get(url)
    .map(data => data.json())
    .toPromise()
    .then(
      (data) => data.map( s => new Source(s.title, s.url, s.api_type, s.sync, s.activated, s.id) )
    );
  }

  loadSourceByID(id: any): Promise<Source>{
    let token = this.auth.token;
    let url = this.backend.authUrl('Sources/'+id, token);

    return this.http.get(url)
    .map(data => data.json())
    .toPromise()
    .then(
      s => new Source(s.title, s.url, s.api_type, s.sync, s.activated, s.id)
    );
  }

  save(source: Source): Promise<any>{
    let token = this.auth.token;
    let url: string;

    if(source.id == undefined){
      url = this.backend.authUrl('Sources', token);
    }else{
      url = this.backend.authUrl('Sources/'+source.id, token);
    }

    let data = {
      'title': source.title,
      'url': source.url,
      'api_type': source.type,
      'sync': source.sync,
      'activated': source.activated
    };

    this.isSaving = true;
    return this.http.put(url, data)
    .toPromise()
    .then(
      () => this.isSaving = false,
      (err) => {
        this.isSaving = false;
        return Promise.reject(err);
      }
    );
  }

}
