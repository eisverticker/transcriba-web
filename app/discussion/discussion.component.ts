import { Component, OnChanges, Input} from '@angular/core';

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
export class DiscussionComponent implements OnChanges{
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
  ){}

  ngOnChanges(){
    this.update();
  }

  private update(){
    return this.discuss.loadCommentPage(this.discussion, this.currentPage, this.itemsPerPage)
    .then(
      (comments) => this.comments = comments
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
    this.discuss.saveComment(this.discussion, this.newComment).then(
      () => this.update()
    );
  }

}
