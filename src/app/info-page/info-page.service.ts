import { HttpClient } from '@angular/common/http';
import { BackendService } from '../utility/backend.service';
import { AuthService } from '../loopback-auth/auth.service';

import { Injectable } from '@angular/core';
import { InfoPage } from './info-page';
import { DiscussionService } from '../discussion/discussion.service';


@Injectable()
export class InfoPageService {

  constructor(
    private http: HttpClient,
    private backend: BackendService,
    private auth: AuthService,
    private discuss: DiscussionService
  ) {}

  loadAll(): Promise<InfoPage[]> {
    const token = this.auth.token;
    const url = this.backend.authUrl('InfoPages', token);

    return this.http.get<Array<any>>(url)
    .toPromise()
    .then(
      (data) => data.map(
        p => new InfoPage(p.name, p.content, p.show_discussion, p.discussionId, p.id)
      )
    );
  }

  loadOneByID(id: any): Promise<InfoPage> {
    const token = this.auth.token;
    const url = this.backend.authUrl('InfoPages/' + id, token);

    return this.http.get(url)
    .toPromise()
    .then(
      p => new InfoPage(
        p['name'],
        p['content'],
        p['show_discussion'],
        p['discussionId'],
        id
      )
    );
  }

  loadOneByName(name: string): Promise<InfoPage> {
    const token = this.auth.token;
    const url = this.backend.authUrl('InfoPages/' + name + '/parsed', token);

    return this.http.get(url)
    .toPromise()
    .then(
      pageData => new InfoPage(
        pageData['name'],
        pageData['content'],
        pageData['show_discussion'],
        pageData['discussionId'],
        pageData['id']
      )
    );
  }

  save(page: InfoPage): Promise<any> {
    const token = this.auth.token;
    let url: string;

    const data = {
      'name': page.name,
      'content': page.content,
      'show_discussion': page.show_discussion
    };

    if (page.id === undefined) {
      url = this.backend.authUrl('InfoPages', token);

      return this.http.put(url, data).toPromise();

    } else {
      url = this.backend.authUrl('InfoPages/' + page.id, token);
      data['discussionId'] = page.discussionID;

      return this.http.put(url, data).toPromise();
    }
  }

  delete(page: InfoPage): Promise<any> {
    const token = this.auth.token;
    const url = this.backend.authUrl('InfoPages/' + page.id, token);

    return this.http.delete(url).toPromise();
  }

}
