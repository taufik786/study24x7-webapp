import { Component, OnInit } from '@angular/core';
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
  errorDiv = false;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router
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
    this.authService.Login(this.data).subscribe(
      (res) => {
        // if(!res.token === undefined && res.token !== '') {
        // this.router.navigate(['/home/all']);
        // }
      },
      (err) => {
        this.errMsg = err.error.message;
        this.errorDiv = true;
      }
    );
  }

  onCloseClick() {
    this.errorDiv = false;
  }
}
