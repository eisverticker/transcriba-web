import { Http } from '@angular/http';
import { BackendHelper } from '../utilities/backend-helper';
import { AuthService } from '../loopback-auth/auth.service';
import { User } from '../loopback-auth/user';

import { Injectable } from '@angular/core';
import { VotingContext } from './voting-context';

@Injectable()
export class VotingService{

  constructor(
    private http: Http,
    private backend: BackendHelper,
    private auth: AuthService
  ){}

  /**
   * Vote for something
   */
  vote(context: VotingContext, voteType: string): Promise<any>{
    let token = this.auth.token;
    let url = this.backend.authUrl('Votings/vote', token);

    return this.http.post(url, {
      'objectType': context.objectType,
      'objectId': context.objectId,
      'vote': voteType
    })
    .toPromise();
  }

  /**
   * Loads the id of the database entity which belongs to the current user
   * and voting context
   */
   private loadVotingIdentifier(context: VotingContext): Promise<any>{
     let token = this.auth.token;
     let url;

     //we need the userId of the currently logged in user for the query first
     return this.auth.loadUser().then(
       (user) => {
         url = this.backend.authUrl('Votings/findOne', token,
         "filter[where][objectType]="+context.objectType+
         "&filter[where][objectId]="+context.objectId+
         "&filter[where][userId]="+user.id);
       }
     ).then(//return the id only
       () => this.http.get(url)
        .map(response => response.json().id)
        .toPromise()
     )
   }


  /**
   * Remove the given vote from the server
   */
  unvote(context: VotingContext): Promise<any>{
    let token = this.auth.token;
    let url;

    return this.loadVotingIdentifier(context).then(
      (id) => {
        url = this.backend.authUrl('Votings/'+id, token);
        return this.http.delete(url).toPromise();
      }
    );
  }

  /**
   * Count votings for something
   */
  count(context: VotingContext, voteType: string): Promise<number>{
    let token = this.auth.token;
    let url = this.backend.authUrl('Votings/count', token,
    "filter[where][objectType]="+context.objectType+
    "&filter[where][objectId]="+context.objectId+
    "&filter[where][vote]="+voteType
    );

    return this.http.get(url)
    .map(response => response.json().count)
    .toPromise();
  }

  /**
   * Load all users who have voted for a given voteType
   */
  loadUsers(context: VotingContext, voteType: string): Promise<User[]>{
    let token = this.auth.token;
    let url = this.backend.authUrl('Votings', token,
    "filter[where][objectType]="+context.objectType+
    "&filter[where][objectId]="+context.objectId+
    "&filter[where][vote]="+voteType+
    "&filter[include]=appUser"
    );

    return this.http.get(url)
    .map(response => response.json())
    .toPromise()
    .then(
      (votings) => votings.map(voting => voting.appUser) //map to appUser
    ).then(
      (users) => users.map(
        user => new User(user.username, user.email, "", [], user.id)
      )
    );
  }

  /**
   * Returns in a promise the voting state of the current user
   * if the user didn't vote for anything then the returned state ist 'none'
   */
  loadVote(context: VotingContext): Promise<string>{
    let token = this.auth.token;
    let url;

    //we need the userId of the currently logged in user for the query first
    return this.auth.loadUser().then(
      (user) => {
        url = this.backend.authUrl('Votings', token,
        "filter[where][objectType]="+context.objectType+
        "&filter[where][objectId]="+context.objectId+
        "&filter[where][userId]="+user.id);
      }
    ).then(//find the user and return the id only
      () => this.http.get(url)
       .map(response => response.json())
       .toPromise()
    ).then(
      (votings) => {
        if(votings.length == 0){
          return "none";
        }else{
          return votings[0].vote;
        }
      }
    )
  }


}
