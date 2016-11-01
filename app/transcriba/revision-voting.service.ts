import { VotingService } from '../voting/voting.service';
import { VotingContext } from '../voting/voting-context';

import { Injectable } from '@angular/core';


import { User } from '../loopback-auth/user';

@Injectable()
export class RevisionVotingService{

  constructor(
    private voting: VotingService
  ){}

  accept(id: any): Promise<any>{
    let votingContext = new VotingContext("Revision", id);

    return this.voting.vote(votingContext, "accept");
  }

  refuse(id: any): Promise<any>{
    let votingContext = new VotingContext("Revision", id);

    return this.voting.vote(votingContext, "refuse");
  }

  unvote(id: any): Promise<any>{
    let votingContext = new VotingContext("Revision", id);

    return this.voting.unvote(votingContext);
  }

  loadVotings(id: any): Promise<{ accept: Array<User>, refuse: Array<User>}>{
    let votingContext = new VotingContext("Revision", id);
    let res = {
      accept: [],
      refuse: []
    };

    return this.voting.loadUsers(votingContext, "accept")
    .then(
      (users) => {
        res.accept = users;
        return this.voting.loadUsers(votingContext, "refuse");
      }
    ).then(
      (users) => {
        res.refuse = users;
        return res;
      }
    );
  }

  loadVote(id: any): Promise<string>{
    let votingContext = new VotingContext("Revision", id);

    return this.voting.loadVote(votingContext);
  }

}
