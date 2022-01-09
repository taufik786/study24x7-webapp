import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
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
  user:any;

@Output() userData: EventEmitter<any> = new EventEmitter();
  @ViewChild('content')
  content!: ElementRef;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
    config: NgbModalConfig, private modalService: NgbModal
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
    
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
      this.errorDiv = true;
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
      // console.log(res,'login')
    })
  }

  onCloseClick() {
    this.errorDiv = false;
  }

  // open(content:any) {
  //   this.modalService.open(content);
  // }
}
