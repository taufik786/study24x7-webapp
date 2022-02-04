import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errMsg: any;
  data: any;
  user:any;
  alertDiv = false;

@Output() userData: EventEmitter<any> = new EventEmitter();
  @ViewChild('content')
  content!: ElementRef;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }
  ngOnInit(): void {

  }

  onLogin() {
    let username = (<HTMLInputElement>document.getElementById('username'))
      .value;
    let regex = /^([0-9]){3,10}$/;
    if(username === ''){
      this.alertDiv = true;
      this.errMsg = 'Please Fill Right Credentials!'
      return
    }
    if (username.match(regex)) {
      this.data = {
        mobile: username,
        password: this.loginForm.value.password,
      };
    } else {
      this.data = {
        email: username,
        password: this.loginForm.value.password,
      };
    }
    this.authService.Login(this.data).subscribe(res => {
      this.user = res.user;
      this.userData.emit(this.user)
      console.log(res,'login')
    }, error => {
      this.alertDiv = true;
      this.errMsg = error.error.message;
    })
  }

  closeAlert(){
    this.alertDiv = false;
  }
}
