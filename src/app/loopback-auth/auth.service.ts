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

  public loadUser(): Promise<User> {
    if (this.isUserInitialized) {
      return Promise.resolve(this.userSubject.getValue());
    }else {
      return this.authenticateUser().then(
        (user) => {
          this.isUserInitialized = true;
          this.userSubject.next(user);
          return user;
        },
        () => {
          this.isUserInitialized = true;
          return this.userSubject.getValue();
        }
      );
    }
  }

  public login(user: User): Promise<void> {
    this.reset(); // delete current token and userid
    this.isUserInitialized = false; // reinitalize user later

    return this.http.post(this.backend.unAuthUrl('AppUsers/login'), {
      'email': user.mail,
      'password': user.password
    }).pipe(
      timeout(5000)
    )
    .toPromise()
    .then(
      (data: any) => {
         this.userID = data.userId;
         this.token = data.id; // save token to localStorage
         this.loadUser(); // reinitalize user
      },
      (err) => {
        if (err === 'Timeout') {
          throw err;
        }else if (err.status === 401) {
          return Promise.reject('wrong credentials');
        }else {
          throw 'unexpected result 34343-AuthService';
        }
      }
    );
  }
  public logout(): Promise<any> {
    return this.http.post(this.backend.authUrl('AppUsers/logout', this.token), {})
     .pipe(
       timeout(5000)
     )
     .toPromise()
     .then(
       () => {
         this.reset();
         this.userSubject.next(User.createGuest());
       },
       (err) => {
         return this.loadUser();
       }
     );
  }
  public verify(code: string): Promise<any> {
    let url = 'AppUsers/confirm?uid=' + this.userID + '&token=' + code;

    return this.http.get(this.backend.authUrl(url, this.token))
    .toPromise();
  }

  public resetPassword(user: User): Promise<any> {
    let url = this.backend.unAuthUrl('AppUsers/reset');

    return this.http.post(url, {
      'email': user.mail
    }).pipe(
      timeout(5000)
    )
    .toPromise();
  }

  public register(user: User): Promise<void> {
    let url = this.backend.unAuthUrl('AppUsers');

    return this.http.post(url, {
      'username': user.name,
      'email': user.mail,
      'password': user.password
    })
    .timeout(5000)
    .toPromise()
    .then(
      () => {
        return;
      }
    );
  }

  public getRoles(userID: any): Promise<Role[]> {
    let url = this.backend.authUrl('AppUsers/' + userID + '/roles', this.token);

    if (this.token === null || userID === null) {
      return Promise.reject<Role[]>('no local user data found');
    }else {
      return this.http.get<any[]>(url)
      .toPromise()
      .then(
        (roles) => {
          let roleNames: Array<string> = roles.map( role => role.name );

          let rolesInOrder = Role.getAvailableRoles().filter(
            (role) => {
              return roleNames.indexOf(role.name) !== -1;
            }
          );
          return rolesInOrder;
        },
        (res) => {
          return Promise.reject<Role[]>(res);
        }
      );
    }
  }

  public get token(): string{
    return localStorage.getItem('token');
  }
  public set token(id: string){
    localStorage.setItem('token', id);
  }

  public get userID(): string{
    return localStorage.getItem('userID');
  }
  public set userID(id: string){
    localStorage.setItem('userID', id);
  }

  private reset() {
    localStorage.removeItem('token');
    localStorage.removeItem('userID');
  }

  private authenticateUser(): Promise<User> {
    let url = this.backend.authUrl('AppUsers/' + this.userID, this.token);

    if (this.token === null || this.userID === null) {
      return Promise.reject<User>('no local user data found');
    }else {
      return this.http.get<any>(url)
      .toPromise()
      .then(
        (data) => {
          let user = new User(data.username, data.email, '', [], data.id);

          return this.getRoles(this.userID).then(
            roles => {
              user.roles = user.roles.concat(roles);
              return user;
            }
          );
        },
        (res) => {
          this.reset();
          return Promise.reject<User>(res);
        }
      );
    }
  }

}
