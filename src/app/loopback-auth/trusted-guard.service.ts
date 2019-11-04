import { Injectable } from '@angular/core';
import { CanActivate, Router,
         ActivatedRouteSnapshot,
         RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class TrustedGuardService implements CanActivate {
  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    const user = await this.auth.loadUser();
    if (!user.isTrusted()) {
      this.router.navigate(['403']);
    }
    return user.isTrusted();

  }
}
