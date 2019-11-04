import { Injectable } from '@angular/core';
import { BackendHelper } from '../utilities/backend-helper';
import { User } from './user';
import { Role } from './role';

import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { map, timeout } from 'rxjs/operators';

@Injectable()
export class UserService {

  constructor(
    private http: HttpClient,
    private backend: BackendHelper,
    private auth: AuthService
  ) {}

  loadUserCount(): Promise<number> {
    const token = this.auth.token;
    const url = this.backend.authUrl('AppUsers/count', token);

    return this.http.get(url).pipe(
      map((data: any) => data.count)
    )
    .toPromise();
  }

  loadUserPage(page: number, itemsPerPage: number): Promise<User[]> {
    const token = this.auth.token;
    const url = this.backend.authUrl(
      'AppUsers',
      token,
      'filter[order]=username&filter[limit]=' + itemsPerPage + '&filter[skip]=' + itemsPerPage * page
    );

    return this.http.get(url).pipe(
      timeout(5000)
    )
    .toPromise()
    .then(
      (users: Array<any>) => {
        users = users.map(
          (u) => new User(u.username, u.email, '', [], u.id)
        );
        return this.includeUserRoles(users, 0);
      }
    );
  }

  giveUserRole(user: User, roleName: string): Promise<any> {
    console.log('giveUserRole', user);

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
    // let token = this.auth.token;
    // let url = this.backend.authUrl('Roles', token);

    // this.http.get(url);
    return Promise.resolve(Role.getAvailableRoles());
  }

  delete(user: User): Promise<any> {
    if (user.id === undefined) {
      throw new Error('can\'t remove a user without userId');
    }
    const token = this.auth.token;
    const url = this.backend.authUrl('AppUsers/' + user.id, token);

    return this.http.delete(url).pipe(
      timeout(5000)
    ).toPromise();
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
