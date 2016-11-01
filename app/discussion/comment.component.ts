import { Component, OnChanges, Input} from '@angular/core';

import { CommentVotingService } from './comment-voting.service';
import { Comment } from './comment';
import { AuthService } from '../loopback-auth/auth.service';
import { User } from '../loopback-auth/user';

@Component({
  moduleId:     module.id,
  selector:    'simple-comment',
  templateUrl: 'comment.component.html',
  styleUrls: []
})
export class CommentComponent implements OnChanges{
  public currentVote: string = "loading";//loading, like, dislike, unwanted or none
  public votings: any;
  public user: User;

  @Input() comment: Comment;

  constructor(
    private voting: CommentVotingService,
    private auth: AuthService
  ){}

  updateVotings(){
    return this.auth.loadUser().then(
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

  ngOnChanges(){
    this.updateVotings();
  }

  like(){
    if(this.currentVote == "like"){
      return this.voting.unvote(this.comment.id).then(
        () => this.updateVotings(),
        err => console.log(err)
      );
    }else{
      return this.voting.like(this.comment.id)
      .then(
        () => this.updateVotings(),
        err => console.log(err)
      );
    }
  }

  dislike(){
    if(this.currentVote == "dislike"){
      return this.voting.unvote(this.comment.id).then(
        () => this.updateVotings(),
        err => console.log(err)
      );
    }else{
      return this.voting.dislike(this.comment.id)
      .then(
        () => this.updateVotings(),
        err => console.log(err)
      );
    }
  }

  unwanted(){
    if(this.currentVote == "unwanted"){
      return this.voting.unvote(this.comment.id).then(
        () => this.updateVotings(),
        err => console.log(err)
      );
    }else{
      return this.voting.unwanted(this.comment.id)
      .then(
        () => this.updateVotings(),
        err => console.log(err)
      );
    }
  }

}
