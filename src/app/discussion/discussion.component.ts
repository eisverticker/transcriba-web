import { Component, OnChanges, SimpleChanges, Input } from '@angular/core';

import { FormRequestHandling } from '../utilities/form-request-handling';

import { DiscussionService } from '../discussion/discussion.service';
import { AuthService } from '../loopback-auth/auth.service';

import { Discussion } from './discussion';
import { Comment } from './comment';
import { User } from '../loopback-auth/user';
import { Observable, zip } from 'rxjs';
import { map } from 'rxjs/operators';


@Component({
  selector:    'tr-simple-discussion',
  templateUrl: 'discussion.component.html',
  styleUrls: []
})
export class DiscussionComponent extends FormRequestHandling implements OnChanges {
  @Input() discussionId: any;
  @Input() itemsPerPage: number;
  user: User;

  currentPage = 0;
  numOfPages: number;
  numOfComments: number;
  newComment: Comment = Comment.createEmptyComment();
  comments: Array<Comment>;
  discussion: Discussion;

  constructor(
    private discuss: DiscussionService,
    private auth: AuthService
  ) {
    super();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.update();
  }

  setPage(page: number) {
    this.currentPage = page;
    this.update();
  }

  addComment() {
    const commentRequest = this.discuss.saveComment(this.discussion, this.newComment);
    this.watchRequestState(commentRequest);

    commentRequest.then(
      () => {
        this.newComment = Comment.createEmptyComment();
        return this.update();
      },
      (err) => console.log('fehler beim kommentieren', err)
    );
  }

  private loadDiscussionAndUserData(): Observable<any> {
    return zip([
      this.auth.loadUser(),
      this.discuss.loadNumOfComments(this.discussion),
      this.discuss.loadCommentPage(this.discussion, this.currentPage, this.itemsPerPage)
    ]).pipe(
      map(
        ([user, numOfComments, comments]) => ({
          user,
          numOfComments,
          comments
        })
      )
    );
  }

  private setNumberOfPages() {
    this.numOfPages = Math.ceil(this.numOfComments / this.itemsPerPage);
  }

  private async update() {
    try {
      const discussion = await this.discuss.loadByID(this.discussionId);
      this.discussion = discussion;
      this.loadDiscussionAndUserData().subscribe((data) => {
        this.comments = data.comments;
        this.user = data.user;
        this.numOfComments = data.numOfComments;
        this.setNumberOfPages();
      }, err => console.log(err));
    } catch (err) {
      console.log('update fehlgeschlagen', err);
      throw err;
    }
  }

}
