import { VotingService } from '../voting/voting.service';
import { VotingContext } from '../voting/voting-context';

import { Injectable } from '@angular/core';
import { Discussion } from './discussion';
import { Comment } from './comment';

import { User } from '../loopback-auth/user';

@Injectable()
export class CommentVotingService{

  constructor(
    private voting: VotingService
  ){}

  like(id: any): Promise<any>{
    let votingContext = new VotingContext("Comment", id);

    return this.voting.vote(votingContext, "like");
  }

  dislike(id: any): Promise<any>{
    let votingContext = new VotingContext("Comment", id);

    return this.voting.vote(votingContext, "dislike");
  }

  unwanted(id: any): Promise<any>{
    let votingContext = new VotingContext("Comment", id);

    return this.voting.vote(votingContext, "unwanted");
  }

  unvote(id: any): Promise<any>{
    let votingContext = new VotingContext("Comment", id);

    return this.voting.unvote(votingContext);
  }

  loadVotings(id: any): Promise<{ likes: Array<User>, dislikes: Array<User>, unwanted: Array<User> }>{
    let votingContext = new VotingContext("Comment", id);
    let res = {
      likes: [],
      dislikes: [],
      unwanted: []
    };

    return this.voting.loadUsers(votingContext, "like")
    .then(
      (users) => {
        res.likes = users;
        return this.voting.loadUsers(votingContext, "dislike");
      }
    ).then(
      (users) => {
        res.dislikes = users;
        return this.voting.loadUsers(votingContext, "unwanted");
      }
    ).then(
      (users) => {
        res.unwanted = users;
        return res;
      }
    );
  }

  loadVote(id: any): Promise<string>{
    let votingContext = new VotingContext("Comment", id);

    return this.voting.loadVote(votingContext);
  }

}
