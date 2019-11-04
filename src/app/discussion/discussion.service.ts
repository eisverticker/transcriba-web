import { BackendHelper } from '../utilities/backend-helper';
import { AuthService } from '../loopback-auth/auth.service';

import { Injectable } from '@angular/core';
import { Discussion } from './discussion';
import { Comment } from './comment';

import { User } from '../loopback-auth/user';
import { HttpClient } from '@angular/common/http';
import { timeout } from 'rxjs/operators';

@Injectable()
export class DiscussionService {

  constructor(
    private http: HttpClient,
    private backend: BackendHelper,
    private auth: AuthService
  ) {}

  /**
   * Loads a discussion from the server by id
   */
  loadByID(id: any): Promise<Discussion> {
    const token = this.auth.token;
    const url = this.backend.authUrl('Discussions/' + id, token);

    return this.http.get<any>(url)
    .toPromise()
    .then(
      (data) => new Discussion(data.title, id)
    );
  }

  loadCommentPage(discussion: Discussion, page: number, itemsPerPage: number): Promise<Comment[]> {
    const token = this.auth.token;
    const url = this.backend.authUrl(
      'Discussions/' + discussion.id + '/comments',
      token,
      'filter[order]=createdAt DESC' +
      '&filter[include]=appUser' +
      '&filter[limit]=' + itemsPerPage + '&filter[skip]=' + itemsPerPage * page
    );

    return this.http.get<any[]>(url).pipe(
      timeout(5000)
    )
    .toPromise()
    .then(
      (comments) => {
        return comments.filter(
          (c) => c.appUser !== undefined
        ).map(
          (c) => {
            const user = User.createEmptyUser();
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
    const token = this.auth.token;
    const url = this.backend.authUrl('Discussions/' + discussion.id + '/comments/count', token);

    return this.http.get<number>(url)
    .toPromise();
  }

  /**
   * Adds a comment to the discussion that was given
   */
  saveComment(discussion: Discussion, comment: Comment): Promise<any> {
    const token = this.auth.token;
    const url = this.backend.authUrl('Discussions/' + discussion.id + '/comments', token);

    return this.http.post(url, {
      'content': comment.content,
      'appUserId': 'none'
    })
    .toPromise();
  }

}
