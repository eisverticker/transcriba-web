import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { BackendHelper } from '../utilities/backend-helper';

import { Observable, Subject, BehaviorSubject } from 'rxjs/Rx';
import { User } from './user';
import { Role } from './role';

import { AuthService } from './auth.service';

@Injectable()
export class UserService{

  constructor(
    private http: Http,
    private backend: BackendHelper,
    private auth: AuthService
  ){}

  loadUserCount(): Promise<number>{
    let token = this.auth.token;
    let url = this.backend.authUrl('AppUsers/count', token);

    return this.http.get(url)
    .map(data => data.json().count)
    .toPromise();
  }

  loadUserPage(page: number, itemsPerPage: number): Promise<User[]>{
    let token = this.auth.token;
    let url = this.backend.authUrl(
      'AppUsers',
      token,
      "filter[order]=username&filter[limit]="+itemsPerPage+"&filter[skip]="+itemsPerPage*page
    );

    return this.http.get(url)
    .timeout(5000, "Timeout")
    .map(data => data.json())
    .toPromise()
    .then(
      (users) => {
        users = users.map(
          (u) => new User(u.username, u.email, "", [], u.id)
        );
        return this.includeUserRoles(users,0);
      }
    );
  }

  /**
   * Add roles to users
   *  Necessary becaus of some loopback-mongodb-connector bug which
   *  hinders us from using include filters for user requests
   */
  private includeUserRoles(users: Array<User>, currentUser: number): Promise<User[]>{
    if(currentUser <= users.length-1){
        let u: User = users[currentUser];

        return this.auth.getRoles(u.id).then(
          (roles) => {
            if(roles.length == 0){
              u.roles = [new Role('none')];
            }else{
              u.roles = roles;
            }
            return this.includeUserRoles(users, currentUser+1);
          }
        );
    }else{
      return Promise.resolve(users);
    }
  }

  giveUserRole(user: User, roleName: string): Promise<any>{
    console.log("giveUserRole",user);

    let token = this.auth.token;
    let url = this.backend.authUrl(
      'AppUsers/roles',
      token
    );

    return this.http.post(url, {
      "id": user.id,
      "rolename": roleName
    }).toPromise();
  }

  /**
   * Load all available user roles
   * (roles are static for now)
   */
  loadRoles(): Promise<Role[]>{
    //let token = this.auth.token;
    //let url = this.backend.authUrl('Roles', token);

    //this.http.get(url);
    return Promise.resolve(Role.getAvailableRoles());
  }

  delete(user: User): Promise<any>{
    if(user.id === undefined) throw "can't remove a user without userId";

    let token = this.auth.token;
    let url = this.backend.authUrl('AppUsers/'+user.id, token);

    return this.http.delete(url).timeout(5000, "Timeout").toPromise();
  }

}
