import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  userAuthenticated = false;
  private authListenerSubs:any= Subscription;
  user: any;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.authService.user.subscribe(res => {
      if(res) {
        this.router.navigate(['/home/all'])
      }
    })
  }
}
