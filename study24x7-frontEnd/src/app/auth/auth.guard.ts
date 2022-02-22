import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { map, Observable, take, tap } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router){}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

    // return this.authService.user.pipe(take(1),map(user => {
    //   console.log(user,'99999999999999')
      // const isAuth = !!user;
      const isAuth = localStorage.getItem('userData');
      if(isAuth) {
        return true;
      }
      return this.router.createUrlTree(['/ttt']);
    // }),
    // tap(isAuth => {
    //   if(!isAuth) {
    //     this.router.navigate(['/'])
    //   }
    // })
    // )
  }
}
