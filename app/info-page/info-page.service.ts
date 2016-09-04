import { Http } from '@angular/http';
import { BackendHelper } from '../utilities/backend-helper';
import { AuthService } from '../loopback-auth/auth.service';

import { Injectable } from '@angular/core';
import { InfoPage } from './info-page';

@Injectable()
export class InfoPageService{

  constructor(
    private http: Http,
    private backend: BackendHelper,
    private auth: AuthService
  ){}

  loadAll(): Promise<InfoPage[]>{
    let token = this.auth.token;
    let url = this.backend.authUrl('InfoPages', token);

    return this.http.get(url)
    .map(data => data.json())
    .toPromise()
    .then(
      (data) => data.map( p => new InfoPage(p.name, p.content, p.id) )
    );
  }

  loadOneByID(id: any): Promise<InfoPage>{
    let token = this.auth.token;
    let url = this.backend.authUrl('InfoPages/'+id, token);

    return this.http.get(url)
    .map(data => data.json())
    .toPromise()
    .then(
      p => new InfoPage(p.name, p.content, p.id)
    );
  }

  loadOneByName(name: string): Promise<InfoPage>{
    let token = this.auth.token;
    let url = this.backend.authUrl('InfoPages/parsed/'+name, token);

    return this.http.get(url)
    .map(data => data.json())
    .toPromise()
    .then(
      data => {
        return new InfoPage(data.page.name, data.page.content, data.page.id);
      }
    );
  }

  save(page: InfoPage): Promise<any>{
    let token = this.auth.token;
    let url: string;

    if(page.id == undefined){
      url = this.backend.authUrl('InfoPages', token);
    }else{
      url = this.backend.authUrl('InfoPages/'+page.id, token);
    }

    let data = {
      'name': page.name,
      'content': page.content
    };

    return this.http.put(url, data)
    .toPromise();
  }

  delete(page: InfoPage): Promise<any>{
    let token = this.auth.token;
    let url = this.backend.authUrl('InfoPages/'+page.id, token);

    return this.http.delete(url).toPromise();
  }

}
