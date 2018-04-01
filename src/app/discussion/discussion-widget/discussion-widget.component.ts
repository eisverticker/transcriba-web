import {
  Component,
  OnChanges,
  SimpleChanges,
  Input
} from '@angular/core';

import { LoggerService } from '../../utility/logger.service';
import { DiscussionService } from '../discussion.service';
import { Comment } from '../comment';

@Component({
  selector: 'disc-discussion-widget',
  templateUrl: './discussion-widget.component.html',
  styleUrls: ['./discussion-widget.component.scss']
})
export class DiscussionWidgetComponent implements OnChanges {
  private logger = LoggerService.getCustomLogger('DiscussionWidgetComponent');

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
      error => this.logger.error(error)
    );
  }


}
