import { Injectable }     from '@angular/core';
import { CanActivate, Router,
         ActivatedRouteSnapshot,
         RouterStateSnapshot }    from '@angular/router';
import { AuthService }    from './auth.service';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(private auth: AuthService, private router: Router){}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    return this.auth.loadUser().then(
      (user) => Promise.resolve(user.isRegistered())
    );

  }
}
