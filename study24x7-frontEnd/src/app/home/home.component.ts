import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.userAuthenticated = this.authService.getIsAuth();
    this.authListenerSubs = this.authService
      .getAuthStatusListener()
      .subscribe((isAuthenticated) => {
        this.userAuthenticated = isAuthenticated;
      });

      
    }
    userDatas(event:any){
      console.log(event,'home')
      this.user = event;
    }
}
