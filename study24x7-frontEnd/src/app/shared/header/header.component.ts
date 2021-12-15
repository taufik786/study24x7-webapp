import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  userAuthenticated = false;
  private authListenerSubs:any= Subscription;
  user: any;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    // this.userAuthenticated = this.authService.getIsAuth();
    // this.authListenerSubs = this.authService
    //   .getAuthStatusListener()
    //   .subscribe((isAuthenticated) => {
    //     this.userAuthenticated = isAuthenticated;
    //   });
      this.user = this.authService.currentUserValue;
      if(this.user) {
        this.userAuthenticated = true;
      } else {
        this.userAuthenticated = false;
      }
  }

  ngOnDestroy() {
    // this.authListenerSubs.unsubscribe();
  }

  onLogout(){
    this.authService.Logout();
  }
}
