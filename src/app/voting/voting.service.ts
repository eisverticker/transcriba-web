import { BackendHelper } from '../utilities/backend-helper';
import { AuthService } from '../loopback-auth/auth.service';
import { User } from '../loopback-auth/user';

import { Injectable } from '@angular/core';
import { VotingContext } from './voting-context';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class VotingService {

  constructor(
    private http: HttpClient,
    private backend: BackendHelper,
    private auth: AuthService
  ) {}

  /**
   * Vote for something
   */
  vote(context: VotingContext, voteType: string): Promise<any> {
    let token = this.auth.token;
    let url: string = this.backend.authUrl('Votings/vote', token);

    return this.http.post(url, {
      'objectType': context.objectType,
      'objectId': context.objectId,
      'vote': voteType
    })
    .toPromise();
  }

  /**
   * Remove the given vote from the server
   */
  async unvote(context: VotingContext): Promise<any> {
    let token = this.auth.token;
    let url: string;

    const id = await this.loadVotingIdentifier(context);
    url = this.backend.authUrl('Votings/' + id, token);
    return this.http.delete(url).toPromise();
  }

  /**
   * Count votings for something
   */
  count(context: VotingContext, voteType: string): Promise<number> {
    let token = this.auth.token;
    let url: string = this.backend.authUrl('Votings/count', token,
    'filter[where][objectType]=' + context.objectType +
    '&filter[where][objectId]=' + context.objectId +
    '&filter[where][vote]=' + voteType
    );

    return this.http.get<any>(url).pipe(
      map(response => response.count)
    )
    .toPromise();
  }

  /**
   * Load all users who have voted for a given voteType
   */
  async loadUsers(context: VotingContext, voteType: string): Promise<User[]> {
    let token = this.auth.token;
    let url: string = this.backend.authUrl('Votings', token,
    'filter[where][objectType]=' + context.objectType +
    '&filter[where][objectId]=' + context.objectId +
    '&filter[where][vote]=' + voteType +
    '&filter[include]=appUser'
    );

    const votings = await this.http.get<any>(url)
      .toPromise();
    const users = votings.map(voting => voting.appUser) // map to appUser
      ;
    return users.map(user => new User(user.username, user.email, '', [], user.id));
  }

  /**
   * Returns in a promise the voting state of the current user
   * if the user didn't vote for anything then the returned state is 'none'
   */
  async loadVote(context: VotingContext): Promise<string> {
    let token = this.auth.token;
    let url: string;

    // we need the userId of the currently logged in user for the query first
    const user = await this.auth.loadUser();
    url = this.backend.authUrl('Votings', token, 'filter[where][objectType]=' + context.objectType +
      '&filter[where][objectId]=' + context.objectId +
      '&filter[where][userId]=' + user.id);
    const votings = await this.http.get<any[]>(url)
      .toPromise();
    if (votings.length === 0) {
      return 'none';
    }
    else {
      return votings[0].vote;
    }
  }

  /**
   * Loads the id of the database entity which belongs to the current user
   * and voting context
   */
   private async loadVotingIdentifier(context: VotingContext): Promise<any> {
     let token = this.auth.token;
     let url: string;

     // we need the userId of the currently logged in user for the query first
     const user = await this.auth.loadUser();
     url = this.backend.authUrl('Votings/findOne', token, 'filter[where][objectType]=' + context.objectType +
       '&filter[where][objectId]=' + context.objectId +
       '&filter[where][userId]=' + user.id);
     return await this.http.get<any>(url).pipe(map(response => response.id))
       .toPromise();
   }

}
