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

    if(this.auth.getCurrentInitState() === true){
      let passed: boolean = this.auth.getActiveUser().isRegistered();
      if(passed === false){
        this.router.navigate(['/403']);
      }
      return Promise.resolve(passed);
    }else{
      let ob = this.auth.isInitialized.filter(x => x === true);

      ob.subscribe(
        (value) => {
          this.router.navigate([route.routeConfig.path]);
        }
      );

      return Promise.resolve(false);
    }

  }
}
