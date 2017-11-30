import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { AuthService } from '../../shared/services';

@Injectable()
export class NoAuthGuard implements CanActivate{
  constructor(private auth: AuthService, private router:Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
  		if(this.auth.isLoggedIn()) this.router.navigate(['/']);
		return (this.auth.isLoggedIn() == true) ? false : true;
   }
}
