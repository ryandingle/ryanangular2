import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { AuthService } from '../../shared/services';

@Injectable()
export class AuthGuard implements CanActivate {
	constructor(
		private auth: AuthService, 
		private router:Router) {}

	canActivate(
	    route: ActivatedRouteSnapshot,
	    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean{
		if(!this.auth.isLoggedIn()) this.router.navigate(['auth/login']);
		return this.auth.isLoggedIn();
   }
}