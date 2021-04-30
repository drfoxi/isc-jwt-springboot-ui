import {Injectable} from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const token: any = JSON.parse(localStorage.getItem('_auth_token'));
    if (token != null) {
      return true;
    } else {
      this.router.navigate(['/account/login'], {queryParams: {returnUrl: state.url}});
      return false;
    }
  }
}


