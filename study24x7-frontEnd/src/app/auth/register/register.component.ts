import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  errorMsg = '';
  alertMsg = false;
  registerForm: FormGroup;
  @Output() loginFalse: EventEmitter<any> = new EventEmitter();
  @ViewChild('content') content!: ElementRef;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private modalService: NgbModal
  ) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      phone: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]],
      cpassword: ['', [Validators.required, Validators.minLength(4)]],
    });
  }
  ngOnInit(): void {}

  onRegister() {
    setTimeout(() => {
      this.alertMsg = false;
    }, 3000);
    if (this.registerForm.invalid) {
      this.errorMsg = 'Please Fill All Fields!';
      this.alertMsg = true;
      return;
    }
    this.authService.CreateAccount(this.registerForm.value).subscribe(
      (res) => {
        this.alertMsg = false;
        this.registerForm.reset();
        this.modalService.dismissAll(this.content);
        this.router.navigate(['/home/all']);
      },
      (err) => {
        console.log(err, 'eeee');
        this.errorMsg = err.error.message;
        this.alertMsg = true;
      }
    );
  }

  loginFls() {
    this.loginFalse.emit(true);
  }
  closeAlert() {
    this.alertMsg = false;
  }
}
