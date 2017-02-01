import { Http } from '@angular/http';
import { BackendHelper } from '../utilities/backend-helper';
import { AuthService } from '../loopback-auth/auth.service';

import { Injectable } from '@angular/core';
import { Discussion } from './discussion';
import { Comment } from './comment';

import { User } from '../loopback-auth/user';

@Injectable()
export class DiscussionService {

  constructor(
    private http: Http,
    private backend: BackendHelper,
    private auth: AuthService
  ) {}

  /**
   * Loads a discussion from the server by id
   */
  loadByID(id: any): Promise<Discussion> {
    let token = this.auth.token;
    let url = this.backend.authUrl('Discussions/' + id, token);

    return this.http.get(url)
    .map(data => data.json())
    .toPromise()
    .then(
      (data) => new Discussion(data.title, id)
    );
  }

  loadCommentPage(discussion: Discussion, page: number, itemsPerPage: number): Promise<Comment[]> {
    let token = this.auth.token;
    let url = this.backend.authUrl(
      'Discussions/' + discussion.id + '/comments',
      token,
      'filter[order]=createdAt DESC' +
      '&filter[include]=appUser' +
      '&filter[limit]=' + itemsPerPage + '&filter[skip]=' + itemsPerPage * page
    );

    return this.http.get(url)
    .timeout(5000)
    .map(data => data.json())
    .toPromise()
    .then(
      (comments) => {
        return comments.filter(
          (c) => c.appUser !== undefined
        ).map(
          (c) => {
            let user = User.createEmptyUser();
            user.name = c.appUser.username;
            user.id = c.appUser.id;
            user.mail = c.appUser.email;
            return new Comment(c.content, user, c.createdAt, c.id);
          }
        );
      }
    );
  }

  loadNumOfComments(discussion: Discussion): Promise<number> {
    let token = this.auth.token;
    let url = this.backend.authUrl('Discussions/' + discussion.id + '/comments/count', token);

    return this.http.get(url)
    .map(data => data.json().count)
    .toPromise();
  }

  /**
   * Adds a comment to the discussion that was given
   */
  saveComment(discussion: Discussion, comment: Comment): Promise<any> {
    let token = this.auth.token;
    let url = this.backend.authUrl('Discussions/' + discussion.id + '/comments', token);

    return this.http.post(url, {
      'content': comment.content,
      'appUserId': 'none'
    })
    .toPromise();
  }

}
