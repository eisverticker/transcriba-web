import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BackendService } from '../utility/backend.service';
import { AuthService } from './auth.service';

import { User } from './user';
import { Role } from './role';

import { timeout } from 'rxjs/operators/timeout';
import { map } from 'rxjs/operators/map';

@Injectable()
export class UserService {

  public static readonly timeout = 5000;

  constructor(
    private http: HttpClient,
    private backend: BackendService,
    private auth: AuthService
  ) {}

  loadUserCount(): Promise<number> {
    const token = this.auth.token;
    const url = this.backend.authUrl('AppUsers/count', token);

    return this.http.get(url)
    .pipe(map(data => data['count']))
    .toPromise();
  }

  loadUserPage(page: number, itemsPerPage: number): Promise<User[]> {
    const token = this.auth.token;
    const url = this.backend.authUrl(
      'AppUsers',
      token,
      'filter[order]=username&filter[limit]=' + itemsPerPage + '&filter[skip]=' + itemsPerPage * page
    );

    return this.http.get<Array<any>>(url)
    .pipe(timeout(UserService.timeout))
    .toPromise()
    .then(
      (users) => {
        users = users.map(
          (u) => new User(u.username, u.email, '', [], u.id)
        );
        return this.includeUserRoles(users, 0);
      }
    );
  }

  giveUserRole(user: User, roleName: string): Promise<any> {

    const token = this.auth.token;
    const url = this.backend.authUrl(
      'AppUsers/roles',
      token
    );

    return this.http.post(url, {
      'id': user.id,
      'rolename': roleName
    }).toPromise();
  }

  /**
   * Load all available user roles
   * (roles are static for now)
   */
  loadRoles(): Promise<Role[]> {
    return Promise.resolve(Role.getAvailableRoles());
  }

  delete(user: User): Promise<any> {
    if (user.id === undefined) {
      throw new Error('can\'t remove a user without userId');
    }
    const token = this.auth.token;
    const url = this.backend.authUrl('AppUsers/' + user.id, token);

    return this.http.delete(url)
    .pipe(timeout(UserService.timeout))
    .toPromise();
  }

  /**
   * Add roles to users
   *  Necessary becaus of some loopback-mongodb-connector bug which
   *  hinders us from using include filters for user requests
   */
  private includeUserRoles(users: Array<User>, currentUser: number): Promise<User[]> {
    if (currentUser <= users.length - 1) {
        const u: User = users[currentUser];

        return this.auth.getRoles(u.id).then(
          (roles) => {
            if (roles.length === 0) {
              u.roles = [new Role('none')];
            } else {
              u.roles = roles;
            }
            return this.includeUserRoles(users, currentUser + 1);
          }
        );
    } else {
      return Promise.resolve(users);
    }
  }

}
