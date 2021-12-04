import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthModel } from './auth.model';

const userApi = "http://127.0.0.1:5000/auth";

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private http: HttpClient) { }

  RegisterWith(body:any):Observable<any> {
    return this.http.post<any>(`${userApi}/register`, body);
  }

  VerifyOtp(otpObj:any):Observable<any>{
    return this.http.post<any>(`${userApi}/verifyOtp/:mobile`, otpObj)
  }

}
