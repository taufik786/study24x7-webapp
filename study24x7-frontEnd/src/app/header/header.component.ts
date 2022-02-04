import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

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
  closeResult = '';
  constructor(private authService: AuthService,private modalService: NgbModal) {}

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
  loginBtn(login:any){
    this.modalService.open(login);
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
  popupDiv(event:any){

  }

  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
  }
}
