import { Component, OnChanges, SimpleChanges, Input } from '@angular/core';

import { DiscussionService } from '../discussion/discussion.service';
import { Comment } from './comment';

@Component({
  moduleId:     module.id,
  selector:    'tr-latest-comments',
  template:
  `
  <div *ngIf="comments">
    <tr-simple-comment *ngFor="let comment of comments" [comment]="comment"></tr-simple-comment>
    <div *ngIf="comments.length == 0">
      {{ 'message.noCommentsAvailable' | translate }}
    </div>
  </div>
  `,
  styleUrls: []
})
export class DiscussionWidgetComponent implements OnChanges {
  @Input() discussionId: any;
  @Input() numOfItems: number;

  comments: Array<Comment>;

  constructor(
    private discussionService: DiscussionService
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    this.discussionService.loadByID(this.discussionId).then(
      discussion => this.discussionService.loadCommentPage(discussion, 0, this.numOfItems).then(
          comments => this.comments = comments
      ),
      err => console.log(err)
    );
  }


}
