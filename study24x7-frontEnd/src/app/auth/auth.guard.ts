import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    //   const isAuth = this.authService.getIsAuth();
    // console.log(isAuth,'issss')
    // if (!isAuth) {
    //   this.router.navigate(['/']);
    // }
    // return isAuth;
    if(localStorage.getItem('token')) {
      return true
    } else {
      return false
    }
  }
  
}
