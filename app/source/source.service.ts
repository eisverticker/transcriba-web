import { Http } from '@angular/http';
import { BackendHelper } from '../utilities/backend-helper';
import { AuthService } from '../loopback-auth/auth.service';

import { Injectable } from '@angular/core';
import { Source } from './source';

@Injectable()
export class SourceService{

  constructor(
    private http: Http,
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
      (data) => data.map( s => new Source(s.title, s.url, s.info_url, s.logo_url, s.api_type, s.sync, s.activated, s.id) )
    );
  }

  //deprecated (alias for loadByID)
  loadSourceByID(id: any): Promise<Source>{
    console.log("loadSourceByID ist deprecated, use loadByID instead");
    return this.loadByID(id);
  }

  loadByID(id: any): Promise<Source>{
    let token = this.auth.token;
    let url = this.backend.authUrl('Sources/'+id, token);

    return this.http.get(url)
    .map(data => data.json())
    .toPromise()
    .then(
      s => new Source(s.title, s.url, s.info_url, s.logo_url, s.api_type, s.sync, s.activated, s.id)
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
