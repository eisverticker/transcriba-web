import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { BackendHelper } from '../utilities/backend-helper';

import { Observable, Subject, BehaviorSubject } from 'rxjs/Rx';
import { User } from './user';
import { Role } from './role';

//import { AuthAction } from './auth-action';

@Injectable()
export class AuthService{
  private isInitializedSubject: BehaviorSubject<boolean>;
  public isInitialized: Observable<boolean>;

  //redirect for login (used by guards)
  public redirectUrl: string = "/";

  private userSubject: BehaviorSubject<User>;
  public user: Observable<User>;

  constructor(
    private http: Http,
    private backend: BackendHelper
  ){
    //Initalize Reactive Components (Observables)
    this.userSubject = new BehaviorSubject(User.createGuest());
    this.user = this.userSubject.asObservable();

    this.isInitializedSubject = new BehaviorSubject(false);
    this.isInitialized = this.isInitializedSubject.asObservable();

    this.loadAuthenticatedUser().then(
      () => { this.isInitializedSubject.next(true) },
      () => { this.isInitializedSubject.next(true) }
    );
  }

  public loadInitializedUser(): Promise<User>{
    if(this.getCurrentInitState()  == true){
      return Promise.resolve(this.getActiveUser());
    }else{
      this.isInitialized.filter( x => x == true).map(x => this.getActiveUser()).subscribe(
        (value) => console.log("init", value)
      );

      return this.isInitialized.filter( x => x == true)
      .map(x => this.getActiveUser())
      .toPromise().then(
        (user) => console.log("yeah")
      );
    }
  }

  public getActiveUser(): User{
    return this.userSubject.getValue();
  }

  public getCurrentInitState(): boolean{
    return this.isInitializedSubject.getValue();
  }

  public loadAuthenticatedUser(): Promise<User>{
    let url = this.backend.authUrl('AppUsers/'+this.userID, this.token);

    if(this.token === null || this.userID === null){
      return Promise.reject<User>("no local user data found");
    }else{
      return this.http.get(url)
      .map(data => data.json())
      .toPromise()
      .then(
        (data) => {
          let user = new User(data.username, data.email, "",[],data.id)

          return this.getRoles(this.userID).then(
            roles => {
              user.roles = user.roles.concat(roles);
              this.userSubject.next(user);
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

  public login(user: User): Promise<void>{
    return this.http.post(this.backend.unAuthUrl('AppUsers/login'), {
      "email": user.mail,
      "password": user.password
    })
    .timeout(5000, "Timeout")
    .toPromise()
    .then(
      (res) => {
         let data = res.json();
         this.userID = data.userId;
         this.token = data.id;//save token to localStorage
         this.loadAuthenticatedUser().then(
           () => { return; },
           () => { return; }
         );
      },
      (err) => {
        if(err == "Timeout"){
          throw err;
        }else if(err.status == 401){
          return Promise.reject("wrong credentials");
        }else{
          throw "unexpected result 34343-AuthService";
        }
      }
    );
  }
  public logout(): Promise<any>{
    return this.http.post(this.backend.authUrl('AppUsers/logout', this.token),{})
     .timeout(5000, "Timeout")
     .toPromise()
     .then(
       ()=> {
         this.reset();
         this.userSubject.next(User.createGuest());
       },
       (err) => {
         return this.loadAuthenticatedUser();
       }
     )
  }
  public verify(code: string): Promise<any>{
    let url = 'AppUsers/confirm?uid='+this.userID+'&token='+code;

    return this.http.get(this.backend.authUrl(url,this.token))
    .toPromise();
  }

  public resetPassword(user: User): Promise<any>{
    let url = this.backend.unAuthUrl('AppUsers/reset');

    return this.http.post(url, {
      "email": user.mail
    })
    .timeout(5000, "Timeout")
    .toPromise();
  }

  public register(user: User): Promise<void>{
    let url = this.backend.unAuthUrl('AppUsers');

    return this.http.post(url,{
      "username": user.name,
      "email": user.mail,
      "password": user.password
    })
    .timeout(5000, "Timeout")
    .toPromise()
    .then(
      () => {
        return;
      }
    );
  }

  public getRoles(userID: any): Promise<Role[]>{
    let url = this.backend.authUrl('AppUsers/'+userID+'/roles', this.token);

    if(this.token === null || userID === null){
      return Promise.reject<Role[]>("no local user data found");
    }else{
      return this.http.get(url)
      .map(data => data.json() )
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
    localStorage.setItem('token',id);
  }

  public get userID(): string{
    return localStorage.getItem('userID');
  }
  public set userID(id: string){
    localStorage.setItem('userID',id);
  }

  private reset(){
    localStorage.removeItem('token');
    localStorage.removeItem('userID');
  }

}
