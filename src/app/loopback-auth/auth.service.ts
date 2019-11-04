import { Injectable } from '@angular/core';
import { BackendHelper } from '../utilities/backend-helper';

import { User } from './user';
import { Role } from './role';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { timeout } from 'rxjs/operators';

@Injectable()
export class AuthService {
  public isUserInitialized = false;

  // redirect for login (used by guards)
  public redirectUrl = '/';

  private userSubject: BehaviorSubject<User>;
  public user: Observable<User>;

  constructor(
    private http: HttpClient,
    private backend: BackendHelper
  ) {
    // Initalize Reactive Components (Observables)
    this.userSubject = new BehaviorSubject(User.createGuest());
    this.user = this.userSubject.asObservable();

  }

  public async loadUser(): Promise<User> {
    if (this.isUserInitialized) {
      return Promise.resolve(this.userSubject.getValue());
    } else {
      try {
        const user = await this.authenticateUser();
        this.isUserInitialized = true;
        this.userSubject.next(user);
        return user;
      } catch (e) {
        this.isUserInitialized = true;
        return this.userSubject.getValue();
      }
    }
  }

  public async login(user: User): Promise<void> {
    this.reset(); // delete current token and userid
    this.isUserInitialized = false; // reinitalize user later

    try {
      const data = await this.http.post<any>(this.backend.unAuthUrl('AppUsers/login'), {
        'email': user.mail,
        'password': user.password
      })
      .pipe(timeout(5000))
      .toPromise();
      this.userID = data.userId;
      this.token = data.id; // save token to localStorage
      this.loadUser(); // reinitalize user
    } catch (err) {
      if (err === 'Timeout') {
        throw err;
      } else if (err.status === 401) {
        return Promise.reject('wrong credentials');
      } else {
        throw new Error('unexpected result 34343-AuthService');
      }
    }
  }
  public async logout(): Promise<any> {
    try {
      await this.http.post(this.backend.authUrl('AppUsers/logout', this.token), {})
        .pipe(timeout(5000))
        .toPromise();
      this.reset();
      this.userSubject.next(User.createGuest());
    } catch (err) {
      return this.loadUser();
    }
  }
  public verify(code: string): Promise<any> {
    const url = 'AppUsers/confirm?uid=' + this.userID + '&token=' + code;

    return this.http.get(this.backend.authUrl(url, this.token))
    .toPromise();
  }

  public resetPassword(user: User): Promise<any> {
    const url = this.backend.unAuthUrl('AppUsers/reset');

    return this.http.post(url, {
      'email': user.mail
    }).pipe(
      timeout(5000)
    )
    .toPromise();
  }

  public async register(user: User): Promise<void> {
    const url = this.backend.unAuthUrl('AppUsers');

    await this.http.post(url, {
      'username': user.name,
      'email': user.mail,
      'password': user.password
    }).pipe(timeout(5000))
      .toPromise();
    return;
  }

  public async getRoles(userID: any): Promise<Role[]> {
    const url = this.backend.authUrl('AppUsers/' + userID + '/roles', this.token);

    if (this.token === null || userID === null) {
      return Promise.reject<Role[]>('no local user data found');
    } else {
      try {
        const roles = await this.http.get<any[]>(url)
          .toPromise();
        const roleNames: Array<string> = roles.map(role => role.name);
        const rolesInOrder = Role.getAvailableRoles().filter((role) => {
          return roleNames.indexOf(role.name) !== -1;
        });
        return rolesInOrder;
      } catch (res) {
        return Promise.reject<Role[]>(res);
      }
    }
  }

  public get token(): string {
    return localStorage.getItem('token');
  }
  public set token(id: string) {
    localStorage.setItem('token', id);
  }

  public get userID(): string {
    return localStorage.getItem('userID');
  }
  public set userID(id: string) {
    localStorage.setItem('userID', id);
  }

  private reset() {
    localStorage.removeItem('token');
    localStorage.removeItem('userID');
  }

  private async authenticateUser(): Promise<User> {
    const url = this.backend.authUrl('AppUsers/' + this.userID, this.token);

    if (this.token === null || this.userID === null) {
      return Promise.reject<User>('no local user data found');
    } else {
      try {
        const data = await this.http.get<any>(url)
          .toPromise();
        const user = new User(data.username, data.email, '', [], data.id);
        const roles = await this.getRoles(this.userID);
        user.roles = user.roles.concat(roles);
        return user;
      } catch (res) {
        this.reset();
        return Promise.reject<User>(res);
      }
    }
  }

}
