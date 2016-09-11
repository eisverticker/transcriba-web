import { Component, OnChanges, Input} from '@angular/core';

import { FormRequestHandling } from '../utilities/form-request-handling';

import { DiscussionService } from '../discussion/discussion.service';

import { Discussion } from './discussion';
import { Comment } from './comment';
import { User } from '../loopback-auth/user';

@Component({
  moduleId:     module.id,
  selector:    'simple-discussion',
  templateUrl: 'discussion.component.html',
  styleUrls: []
})
export class DiscussionComponent extends FormRequestHandling implements OnChanges{
  @Input() discussion: Discussion;
  @Input() itemsPerPage: number;
  @Input() user: User;

  public currentPage: number = 0;
  public numOfPages: number = 1;
  public numOfComments: number = 0;
  public newComment: Comment = Comment.createEmptyComment();

  public comments: Array<Comment> = [];

  constructor(
    private discuss: DiscussionService
  ){
    super();
  }

  ngOnChanges(){
    this.update();
  }

  private update(){
    return this.discuss.loadCommentPage(this.discussion, this.currentPage, this.itemsPerPage)
    .then(
      (comments) => this.comments = comments,
      (err) => {
        console.log("update fehlgeschlagen", err);
        return Promise.reject(err);
      }
    ).then(
      () => this.discuss.loadNumOfComments(this.discussion).then(
        (numComments) => {
          this.numOfComments = numComments;
          this.numOfPages = Math.ceil(numComments/this.itemsPerPage);
        }
      )
    );
  }

  public setPage(page: number){
    this.currentPage = page;
    this.update();
  }

  public addComment(){
    let commentRequest = this.discuss.saveComment(this.discussion, this.newComment);
    this.watchRequestState(commentRequest);

    commentRequest.then(
      () => {
        this.newComment = Comment.createEmptyComment();
        return this.update();
      },
      (err) => console.log("fehler beim kommentieren", err)
    );
  }

}
