import {
  Component,
  OnChanges,
  SimpleChanges,
  Input
} from '@angular/core';

import { FormRequestHandling } from '../../utility/form-request-handling';

import { DiscussionService } from '../discussion.service';
import { AuthService } from '../../loopback-auth/auth.service';
import { LoggerService } from '../../utility/logger.service';

import { Discussion } from '../discussion';
import { Comment } from '../comment';
import { User } from '../../loopback-auth/user';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { zip } from 'rxjs';

@Component({
  selector: 'disc-discussion',
  templateUrl: './discussion.component.html',
  styleUrls: ['./discussion.component.scss']
})
export class DiscussionComponent extends FormRequestHandling implements OnChanges {
  static logger = LoggerService.getCustomLogger(DiscussionService.name);

  @Input() discussionId: any;
  @Input() itemsPerPage: number;

  user: User;
  currentPage = 0;
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
      (err) => DiscussionComponent.logger.error('addComment', err)
    );
  }

  private loadDiscussionAndUserData(): Observable<any> {
    return zip(
      [
        this.auth.loadUser(),
        this.discuss.loadNumOfComments(this.discussion),
        this.discuss.loadCommentPage(this.discussion, this.currentPage, this.itemsPerPage)
      ]
    ).pipe(
      map(
        (resolved) => {
          return {
            user: resolved[0],
            numOfComments: resolved[1],
            comments: resolved[2]
          };
        }
      )
    );
  }


  private update() {
    return this.discuss.loadByID(this.discussionId).then(
      (discussion) => {
        this.discussion = discussion;
        this.loadDiscussionAndUserData().subscribe(
          (data) => {
            this.comments = data.comments;
            this.user = data.user;
            this.numOfComments = data.numOfComments;
          },
          err => DiscussionComponent.logger.error(err)
        );
      },
      (err) => {
        DiscussionComponent.logger.error('update', err);
        return Promise.reject(err);
      }
    );
  }

}
