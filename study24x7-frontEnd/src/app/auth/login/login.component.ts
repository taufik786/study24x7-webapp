import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
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
  user: any;
  alertDiv = false;

  @ViewChild('content')
  content!: ElementRef;
  @Input() authLogin: any;
  @Output() authLgn: EventEmitter<any> = new EventEmitter();

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
  ngOnInit(): void {}

  onLogin() {
    console.log(this.loginForm.value)
    if (this.loginForm.invalid) {
      this.alertDiv = true;
      this.errMsg = 'Please Fill Right Credentials!';
      return;
    }
    this.authService.Login(this.loginForm.value).subscribe(
      (res) => {
        this.user = res.user;
        // console.log(res, 'login');
      },
      (error) => {
        // console.log(error,'eeee')
        this.alertDiv = true;
        this.errMsg = error.error.message;
      }
    );
  }

  closeAlert() {
    this.alertDiv = false;
  }
  SignUp() {
    this.authLgn.emit(true);
  }
}
