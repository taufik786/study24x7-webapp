import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-home-all',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  user: any;
  userSubs!: Subscription
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.userSubs = this.authService.user.subscribe(res => {
      this.user = res;
      console.log(res,'hhhh')
    })
  }

  ngOnDestroy(): void {
      this.userSubs.unsubscribe();
  }
}
