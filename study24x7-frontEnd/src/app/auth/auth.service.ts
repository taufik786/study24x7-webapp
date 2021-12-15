import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, map, Observable, Subject } from 'rxjs';
import { AuthModel } from './auth.model';

const userApi = 'http://127.0.0.1:5000/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private token: any;
  private isAuthenticated = false;
  private tokenTimer: any;
  authStatusListener = new Subject<boolean>();

  authModel = new Subject<AuthModel>();
  private currentUserSubject: BehaviorSubject<AuthModel>;
  public currentUser: Observable<AuthModel>;

  constructor(private http: HttpClient, private router: Router) {
    this.currentUserSubject = new BehaviorSubject<AuthModel>(
      JSON.parse(localStorage.getItem('currentUser') as string)
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): AuthModel {
    return this.currentUserSubject.value;
  }

  getToken() {
    return this.token;
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  RegisterWith(body: any): Observable<any> {
    return this.http.post<any>(`${userApi}/register`, body);
  }

  VerifyOtp(body: any): Observable<any> {
    return this.http.post<any>(`${userApi}/verifyOtp`, body);
  }

  CreateAccount(body: any): Observable<any> {
    return this.http.post<any>(`${userApi}/createAccount`, body);
  }

  Login(body: any): Observable<any> {
    return this.http.post<any>(`${userApi}/login`, body).pipe(
      map((response) => {
        // console.log(response);
        const token = response.token;
        // this.token = token;
        // if (token) {
        //   const expiresInDuration = response.expiresIn;
        //   this.setAuthTimer(expiresInDuration);
        //   this.isAuthenticated = true;
        //   this.authStatusListener.next(true);
        //   const now = new Date();
        //   const expirationDate = new Date(
        //     now.getTime() + expiresInDuration * 1000
        //   );
        //   this.saveAuthDate(token, expirationDate, response);
        // }
        if (response && response.token) {
          localStorage.setItem('currentUser', JSON.stringify(response));
          this.currentUserSubject.next(response);
          this.router.navigate(['/test']);
        }
        return response;
      })
    );
  }

  loggedIn() {
    const currentUser = this.currentUserValue;
    if(currentUser && currentUser.token) {
      return true
    } else {
      return false
    }
  }

  autoAuthUser() {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
    }
  }
  Logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    clearTimeout(this.tokenTimer);
    this.clearAuthDate();
    this.router.navigate(['/']);
  }

  private setAuthTimer(duration: number) {
    console.log('Setting timer : ' + duration);
    this.tokenTimer = setTimeout(() => {
      this.Logout();
    }, duration * 1000);
  }

  private saveAuthDate(token: string, expirationDate: Date, currentUser:any) {
    localStorage.setItem('token', token);
    localStorage.setItem('currentUser', currentUser);
    localStorage.setItem('expiration', expirationDate.toISOString());
  }

  private clearAuthDate() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('currentUser');
  }

  private getAuthData() {
    const token = localStorage.getItem('token');
    const currentUser = localStorage.getItem('currentUser');
    const expirationDate = localStorage.getItem('expiration');
    if (!token || !expirationDate || !currentUser) {
      return;
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate),
    };
  }
}
