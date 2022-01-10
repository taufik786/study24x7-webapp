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
  ispopUpShow = false;
  login = false;
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.userAuthenticated = this.authService.getIsAuth();
    this.authListenerSubs = this.authService
      .getAuthStatusListener()
      .subscribe((isAuthenticated) => {
        this.userAuthenticated = isAuthenticated;
      });

      // $('#myModal').on('shown.bs.modal', function () {
      //   $('#myInput').trigger('focus')
      // })

  }

  onLogout(){
    this.authService.logout();
  }
  loginBtn(){
    this.login = true;
    // this.modalService.open(login);
  }
  signupBtn(signup:any){
    // this.modalService.open(signup);
  }
  ClickedOut(event:any) {
    //debugger;
    if(event.target.className === "hover_bkgr_fricc") {
      this.ispopUpShow = false;
    }
  }

  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
  }
}
