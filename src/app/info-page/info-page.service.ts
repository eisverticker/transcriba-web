import { BackendHelper } from '../utilities/backend-helper';
import { AuthService } from '../loopback-auth/auth.service';

import { Injectable } from '@angular/core';
import { InfoPage } from './info-page';
import { DiscussionService } from '../discussion/discussion.service';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class InfoPageService {

  constructor(
    private http: HttpClient,
    private backend: BackendHelper,
    private auth: AuthService,
    private discuss: DiscussionService
  ) {}

  loadAll(): Promise<InfoPage[]> {
    const token = this.auth.token;
    const url = this.backend.authUrl('InfoPages', token);

    return this.http.get<any[]>(url)
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

    return this.http.get<any>(url)
    .toPromise()
    .then(
      p => new InfoPage(p.name, p.content, p.show_discussion, p.discussionId, id)
    );
  }

  loadOneByName(name: string): Promise<InfoPage> {
    const token = this.auth.token;
    const url = this.backend.authUrl('InfoPages/parsed/' + name, token);

    return this.http.get<any>(url)
    .toPromise()
    .then(
      data => {
        const p = data.page;
        return new InfoPage(p.name, p.content, p.show_discussion, p.discussionId, p.id);
      }
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
      /*return this.discuss.startDiscussion().then(
        (discussion) => {
          data['discussionId'] = discussion.id;

        }
      );*/
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
