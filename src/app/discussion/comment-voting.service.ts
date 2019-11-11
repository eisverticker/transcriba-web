import { VotingService } from '../voting/voting.service';
import { VotingContext } from '../voting/voting-context';

import { Injectable } from '@angular/core';

import { User } from '../loopback-auth/user';

@Injectable()
export class CommentVotingService {

  constructor(
    private voting: VotingService
  ) {}

  like(id: any): Promise<any> {
    const votingContext = new VotingContext('Comment', id);

    return this.voting.vote(votingContext, 'like');
  }

  dislike(id: any): Promise<any> {
    const votingContext = new VotingContext('Comment', id);

    return this.voting.vote(votingContext, 'dislike');
  }

  unwanted(id: any): Promise<any> {
    const votingContext = new VotingContext('Comment', id);

    return this.voting.vote(votingContext, 'unwanted');
  }

  unvote(id: any): Promise<any> {
    const votingContext = new VotingContext('Comment', id);

    return this.voting.unvote(votingContext);
  }

  loadVotings(id: any): Promise<{ likes: Array<User>, dislikes: Array<User>, unwanted: Array<User> }> {
    const votingContext = new VotingContext('Comment', id);
    const res = {
      likes: [],
      dislikes: [],
      unwanted: []
    };

    return this.voting.loadUsers(votingContext, 'like')
    .then(
      (users) => {
        res.likes = users;
        return this.voting.loadUsers(votingContext, 'dislike');
      }
    ).then(
      (users) => {
        res.dislikes = users;
        return this.voting.loadUsers(votingContext, 'unwanted');
      }
    ).then(
      (users) => {
        res.unwanted = users;
        return res;
      }
    );
  }

  loadVote(id: any): Promise<string> {
    const votingContext = new VotingContext('Comment', id);

    return this.voting.loadVote(votingContext);
  }

}
