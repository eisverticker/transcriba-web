import { Http } from '@angular/http';
import { BackendHelper } from '../utilities/backend-helper';
import { AuthService } from '../loopback-auth/auth.service';

import { Injectable } from '@angular/core';
import { InfoPage } from './info-page';
import { DiscussionService } from '../discussion/discussion.service';


@Injectable()
export class InfoPageService{

  constructor(
    private http: Http,
    private backend: BackendHelper,
    private auth: AuthService,
    private discuss: DiscussionService
  ){}

  loadAll(): Promise<InfoPage[]>{
    let token = this.auth.token;
    let url = this.backend.authUrl('InfoPages', token);

    return this.http.get(url)
    .map(data => data.json())
    .toPromise()
    .then(
      (data) => data.map(
        p => new InfoPage(p.name, p.content, p.show_discussion, p.discussionId, p.id)
      )
    );
  }

  loadOneByID(id: any): Promise<InfoPage>{
    let token = this.auth.token;
    let url = this.backend.authUrl('InfoPages/'+id, token);

    return this.http.get(url)
    .map(data => data.json())
    .toPromise()
    .then(
      p => new InfoPage(p.name, p.content, p.show_discussion, p.discussionId,id)
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
        let p = data.page;
        return new InfoPage(p.name, p.content, p.show_discussion, p.discussionId, p.id);
      }
    );
  }

  save(page: InfoPage): Promise<any>{
    let token = this.auth.token;
    let url: string;

    let data = {
      'name': page.name,
      'content': page.content,
      'show_discussion': page.show_discussion
    };

    if(page.id == undefined){
      url = this.backend.authUrl('InfoPages', token);
      /*return this.discuss.startDiscussion().then(
        (discussion) => {
          data['discussionId'] = discussion.id;

        }
      );*/
      return this.http.put(url, data).toPromise();

    }else{
      url = this.backend.authUrl('InfoPages/'+page.id, token);
      data['discussionId'] = page.discussionID;

      return this.http.put(url, data).toPromise();
    }
  }

  delete(page: InfoPage): Promise<any>{
    let token = this.auth.token;
    let url = this.backend.authUrl('InfoPages/'+page.id, token);

    return this.http.delete(url).toPromise();
  }

}
