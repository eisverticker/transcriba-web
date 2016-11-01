import { Component, OnChanges, Input} from '@angular/core';

import { FormRequestHandling } from '../utilities/form-request-handling';

import { DiscussionService } from '../discussion/discussion.service';
import { AuthService } from '../loopback-auth/auth.service';

import { Discussion } from './discussion';
import { Comment } from './comment';
import { User } from '../loopback-auth/user';
import { Observable } from 'rxjs/Rx';


@Component({
  moduleId:     module.id,
  selector:    'simple-discussion',
  templateUrl: 'discussion.component.html',
  styleUrls: []
})
export class DiscussionComponent extends FormRequestHandling implements OnChanges{
  @Input() discussionId: any;
  @Input() itemsPerPage: number;
  user: User;

  currentPage: number = 0;
  numOfPages: number;
  numOfComments: number;
  newComment: Comment = Comment.createEmptyComment();
  comments: Array<Comment>;
  discussion: Discussion;

  constructor(
    private discuss: DiscussionService,
    private auth: AuthService
  ){
    super();
  }

  ngOnChanges(){
    this.update();
  }

  setPage(page: number){
    this.currentPage = page;
    this.update();
  }

  addComment(){
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

  private loadDiscussionAndUserData(): Observable<any>{
    return Observable.zip(
      this.auth.loadUser(),
      this.discuss.loadNumOfComments(this.discussion),
      this.discuss.loadCommentPage(this.discussion, this.currentPage, this.itemsPerPage),
      function(user, numOfComments, comments){
        return {
          "user": user,
          "numOfComments": numOfComments,
          "comments": comments
        }
      }
    );
  }

  private setNumberOfPages(){
    this.numOfPages = Math.ceil(this.numOfComments/this.itemsPerPage);
  }

  private update(){
    return this.discuss.loadByID(this.discussionId).then(
      (discussion) => {
        this.discussion = discussion;
        this.loadDiscussionAndUserData().subscribe(
          (data) => {
            this.comments = data.comments;
            this.user = data.user;
            this.numOfComments = data.numOfComments;
            this.setNumberOfPages();
          },
          err => console.log(err)
        );
      },
      (err) => {
        console.log("update fehlgeschlagen", err);
        return Promise.reject(err);
      }
    );
  }

}
