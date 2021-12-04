import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  emailSection = false;
  mobileSection = true;
  errorMsg = '';
  alertMsg = false;
  otpSection = false;
  mobileTimer = true;
  resend = false;
  signupMain = true;
  createAccoutSec = false;
  userDetails: any;
  registerForm: FormGroup;
  registerMobile: FormGroup;
  registerEmail: FormGroup;
  otpVerify: FormGroup;
  editedMobile: any = '';
  editeEmail: any = '';
  display: any;
  timerShow: any;
  timeSec:any = 30;
  mobileNum: any;

  constructor(private fb: FormBuilder, private authService: AuthService, private route: ActivatedRoute, private router: Router) { 
    this.registerForm = this.fb.group({
      name : ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]]
    });
    this.registerMobile = this.fb.group({
      mobile : ['', Validators.required]
    });
    this.registerEmail = this.fb.group({
      email : ['', Validators.required]
    });
    this.otpVerify = this.fb.group({
      otp : ['', Validators.required]
    });
  }
  ngOnInit(): void { 

  }

  signupEmail(){
    this.mobileSection = false;
    this.emailSection = true;
    this.alertMsg = false;
  }
  signupMobile(){
    this.mobileSection = true;
    this.emailSection = false;
    this.alertMsg = false;
  }
  register(type:any){
    this.mobileNum = document.getElementById('mobileNum');
    const email:any = document.getElementById('email');
    if(type == 1) {
      let regex = /^([0-9]){2,10}$/;
      this.userDetails = this.mobileNum.value;
      if(this.userDetails === '' || this.userDetails === null ) {
        this.alertMsg = true;
        this.errorMsg = 'Please Fill Mobile Number!';
      } else if(!regex.test(this.userDetails)) {
        this.alertMsg = true;
        this.errorMsg = 'Enter Valid Mobile Number!';
      } else {
        // let mobile = mobileNum.value;
        let params = new HttpParams();
            params = params.append('mobile',this.mobileNum.value);
        this.authService.RegisterWith(this.registerMobile.value).subscribe((res:any) => {
          console.log(res)
          this.router.navigate(['/sssssssss'])
          console.log(window.location.href);
          
          // this.router.navigate([window.location.href, {
          //   queryParams: {
          //     'mobile': this.mobileNum.value
          //   }
          // }]);
        }, (err:any) => {
          console.log(err,'errrrroorr')
        })
        this.alertMsg = false;
        this.otpSection = true;
        this.signupMain = false;
        this.mobileTimer = true;
        this.userDetails = this.mobileNum.value;
        this.timeSec = 30;
        this.timmer();
        this.resend = false;        
      }

    } else if(type === 2) {
      let regexEmail = /^([_\-\.0-9a-zA-Z]+)@([_\-\.0-9a-zA-Z]+)\.([a-zA-Z]){2,7}$/;
      this.userDetails = email.value;
      if(this.userDetails === '' ) {
        this.alertMsg = true;
        this.errorMsg = 'Please Fill Email Address';
      } else if(!regexEmail.test(this.userDetails) || this.userDetails.length === 0) {
        this.alertMsg  = true;
        this.errorMsg = 'Please Enter Valid Email Address';
      } else {
        this.authService.RegisterWith(this.registerEmail.value).subscribe(res => {
          console.log(res);
        })
        console.log(email.value);
        this.otpSection = true;
        this.signupMain = false;
        this.alertMsg = false;
        this.mobileTimer = true;
        this.userDetails = email.value;
        this.timeSec = 30;
        this.timmer();
        this.resend = false;

      }
    }
  }
  verifyOtp(){
    let otp:any = document.getElementById('otp');
    otp = otp.value;
    if(otp === '' || otp === null ) {
      this.alertMsg = true;
      this.errorMsg = 'Please Fill One Time Password';
    } else if(otp.length !== 4 ) {
      this.alertMsg = true;
      this.errorMsg = 'OTP Should be 4 characters';
    } else {
      let data:any = {};
      data['mobile']=this.mobileNum.value;
      data['otp']=this.otpVerify.value
      this.authService.VerifyOtp(data).subscribe(res => {
        console.log(res,'otp done');
        
      })
      this.alertMsg = false;
      this.otpSection = false;
      this.createAccoutSec = true;
    }
  }

  edit(data: any){
    this.timeSec = 0;
    let regex = /^([0-9]){10}$/;
    if(regex.test(data)) {
      this.editedMobile = data;
      // this.editeEmail = '';
      // this.mobileSection = true;
      // this.emailSection = false;
    } else {
      this.editeEmail = data;
      // this.editedMobile = '';
      // this.emailSection = true;
      // this.mobileSection = false;
    }
    this.signupMain = true;
    this.otpSection = false;
  }
  timmer() {
    const prefix = this.timeSec < 10 ? "0" : "00";

    var timer = setInterval(() => {
      if (this.timeSec <= 0) {
        clearInterval(timer);
        this.resend = true;
        this.mobileTimer = false;
        this.timerShow = '';
      } else {
        this.timeSec--;
        this.timerShow = `${prefix}:${this.timeSec}`;
      }
    }, 1000);
  }
  
  resendOtp(){
    this.timeSec = 30;
    this.timmer();
    this.mobileTimer = true;
    this.resend = false;
  }


  createAccout(){

  }
  keyupFunc(event:any){
    if(event.keyCode === 13) {
      if(document.getElementById('mobileNum')) {
        this.register(1);
      } else if(document.getElementById('email')) {
        this.register(2);
      } else if(document.getElementById('otp')) {
        this.verifyOtp();
      } else {
        console.log('not work')
      }
    }
  }
}
