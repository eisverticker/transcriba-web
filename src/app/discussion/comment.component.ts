import { Component, OnChanges, Input, SimpleChanges } from '@angular/core';

import { CommentVotingService } from './comment-voting.service';
import { Comment } from './comment';
import { AuthService } from '../loopback-auth/auth.service';
import { User } from '../loopback-auth/user';

@Component({
  selector:    'tr-simple-comment',
  templateUrl: 'comment.component.html',
  styleUrls: []
})
export class CommentComponent implements OnChanges {
  public currentVote = 'loading'; // loading, like, dislike, unwanted or none
  public votings: any;
  public user: User;

  @Input() comment: Comment;

  constructor(
    private voting: CommentVotingService,
    private auth: AuthService
  ) {}

  async updateVotings() {
    const user = await this.auth.loadUser();
    this.user = user;
    const votings = await this.voting.loadVotings(this.comment.id);
    this.votings = votings;
    const vote = await this.voting.loadVote(this.comment.id);
    this.currentVote = vote;
  }

  ngOnChanges(changes: SimpleChanges) {
    this.updateVotings();
  }

  async like() {
    if (this.currentVote === 'like') {
      try {
        await this.voting.unvote(this.comment.id);
        return await this.updateVotings();
      } catch (err) {
        return console.log(err);
      }
    } else {
      try {
        await this.voting.like(this.comment.id);
        return await this.updateVotings();
      } catch (err_1) {
        return console.log(err_1);
      }
    }
  }

  async dislike() {
    if (this.currentVote === 'dislike') {
      try {
        await this.voting.unvote(this.comment.id);
        return await this.updateVotings();
      } catch (err) {
        return console.log(err);
      }
    } else {
      try {
        await this.voting.dislike(this.comment.id);
        return await this.updateVotings();
      } catch (err_1) {
        return console.log(err_1);
      }
    }
  }

  async unwanted() {
    if (this.currentVote === 'unwanted') {
      try {
        await this.voting.unvote(this.comment.id);
        return await this.updateVotings();
      } catch (err) {
        return console.log(err);
      }
    } else {
      try {
        await this.voting.unwanted(this.comment.id);
        return await this.updateVotings();
      } catch (err_1) {
        return console.log(err_1);
      }
    }
  }

}
