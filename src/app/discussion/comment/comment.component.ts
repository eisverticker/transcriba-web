import {
  Component,
  OnChanges,
  Input,
  SimpleChanges
} from '@angular/core';

import { CommentVotingService } from '../comment-voting.service';
import { LoggerService } from '../../utility/logger.service';

import { Comment } from '../comment';
import { AuthService } from '../../loopback-auth/auth.service';
import { User } from '../../loopback-auth/user';

@Component({
  selector: 'disc-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnChanges {
  private logger = LoggerService.getCustomLogger('CommentComponent');

  public currentVote = 'loading'; // loading, like, dislike, unwanted or none
  public votings: any;
  public user: User;

  @Input() comment: Comment;

  constructor(
    private voting: CommentVotingService,
    private authService: AuthService
  ) {}

  updateVotings() {
    return this.authService.loadUser().then(
      (user) => this.user = user
    ).then(
      () => this.voting.loadVotings(this.comment.id).then(
        (votings) => {
          this.votings = votings;
          return this.voting.loadVote(this.comment.id);
        }
      ).then(
        (vote) => {
          this.currentVote = vote;
        }
      )
    );
  }

  ngOnChanges(changes: SimpleChanges) {
    this.updateVotings();
  }

  like() {
    if (this.currentVote === 'like') {
      return this.voting.unvote(this.comment.id).then(
        () => this.updateVotings(),
        err => this.logger.error(err)
      );
    } else {
      return this.voting.like(this.comment.id)
      .then(
        () => this.updateVotings(),
        err => this.logger.error(err)
      );
    }
  }

  dislike() {
    if (this.currentVote === 'dislike') {
      return this.voting.unvote(this.comment.id).then(
        () => this.updateVotings(),
        err => this.logger.error(err)
      );
    } else {
      return this.voting.dislike(this.comment.id)
      .then(
        () => this.updateVotings(),
        err => this.logger.error(err)
      );
    }
  }

  unwanted() {
    if (this.currentVote === 'unwanted') {
      return this.voting.unvote(this.comment.id).then(
        () => this.updateVotings(),
        err => this.logger.error(err)
      );
    } else {
      return this.voting.unwanted(this.comment.id)
      .then(
        () => this.updateVotings(),
        err => this.logger.error(err)
      );
    }
  }

}
