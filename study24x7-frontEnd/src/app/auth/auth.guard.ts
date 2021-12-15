import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}
  // canActivate(
  //   route: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot
  // ): boolean | Observable<boolean> | Promise<boolean> {
  //   // const isAuth = this.authService.getIsAuth();
  //   const isAuth = this.authService.currentUserValue
  //   if (!isAuth) {
  //     this.router.navigate(['/']);
  //   }
  //   return true;
  // }

  canActivate( route: ActivatedRouteSnapshot ): boolean {
    const currentUser = this.authService.currentUserValue;
    // if(currentUser){
    //   if(route.data.roles && route.data.roles.indexOf(currentUser.role) === -1) {
    //     this.router.navigate(['/register']);
    //     return false;
    //   }
    //   return true
    // }
    // this.router.navigate(['/login'])
    // return false
    if (!currentUser) {
      this.router.navigate(['/']);
    }
    return true;
  }
}
