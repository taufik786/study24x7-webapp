import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, tap } from 'rxjs';
import { AuthData } from './auth.model';
import { User } from './user.modal';

const userApi = 'http://127.0.0.1:5000/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user = new BehaviorSubject<User>(null!);
  private tokenExpirationTimer: any;
  private Token:any;

  constructor(private http: HttpClient, private router: Router) {}

  CreateAccount(authData: AuthData) {
    return this.http.post<any>(`${userApi}/register`, authData).pipe(
      tap((resData) => {
        this.handleAuthentication(
          resData.USER_DATA.name,
          resData.USER_DATA.email,
          resData.USER_DATA.phone,
          resData.USER_DATA.id,
          resData.USER_DATA.isAdmin,
          resData.token,
          +resData.expiresIn
        );
      })
    );
  }

  Login(authData: AuthData) {
    return this.http.post<any>(`${userApi}/login`, authData).pipe(
      tap((resData) => {
        this.handleAuthentication(
          resData.USER_DATA.name,
          resData.USER_DATA.email,
          resData.USER_DATA.phone,
          resData.USER_DATA._id,
          resData.USER_DATA.isAdmin,
          resData.token,
          +resData.expiresIn
        );
      })
    );
  }

  private handleAuthentication(
    name: string,
    email: string,
    phone: string,
    userId: string,
    isAdmin: string,
    token: string,
    expiresIn: number
  ) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(
      name,
      email,
      phone,
      userId,
      isAdmin,
      token,
      expirationDate
    );
    this.Token = token
    this.user.next(user);
    this.autoLogout(expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
  }

  logout() {
    this.user.next(null!);
    this.Token = null;
    this.router.navigate(['/']);
    localStorage.removeItem('userData');
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  autoLogin() {
    const userData: {
      name: string;
      email: string;
      phone: string;
      userId: string;
      isAdmin: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userData') as string);
    if (!userData) {
      return;
    }
    this.Token = userData._token
    const loadedUser = new User(
      userData.name,
      userData.email,
      userData.phone,
      userData.userId,
      userData.isAdmin,
      userData._token,
      new Date(userData._tokenExpirationDate)
    );
    if (loadedUser.token) {
      this.user.next(loadedUser);
      const expirationDuration =
        new Date(userData._tokenExpirationDate).getTime() -
        new Date().getTime();
      this.autoLogout(expirationDuration);
    }
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  getToken(){
    return this.Token;
  }
}
