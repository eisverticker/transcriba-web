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

  async loadVotings(id: any): Promise<{ likes: Array<User>, dislikes: Array<User>, unwanted: Array<User> }> {
    const votingContext = new VotingContext('Comment', id);
    const res = {
      likes: [],
      dislikes: [],
      unwanted: []
    };

    const users = await this.voting.loadUsers(votingContext, 'like');
    res.likes = users;
    const users_1 = await this.voting.loadUsers(votingContext, 'dislike');
    res.dislikes = users_1;
    const users_2 = await this.voting.loadUsers(votingContext, 'unwanted');
    res.unwanted = users_2;
    return res;
  }

  loadVote(id: any): Promise<string> {
    const votingContext = new VotingContext('Comment', id);

    return this.voting.loadVote(votingContext);
  }

}
