import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy, AfterViewInit {
  userAuthenticated = false;
  private authListenerSubs: any = Subscription;
  user: any;
  ispopUpShow = false;
  closeResult = '';
  formTitle = '';
  login = false;
  @ViewChild('content') content!: ElementRef<any>;
  constructor(
    private authService: AuthService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.userAuthenticated = this.authService.getIsAuth();
    this.authListenerSubs = this.authService
      .getAuthStatusListener()
      .subscribe((isAuthenticated) => {
        this.userAuthenticated = isAuthenticated;
      });
  }
  ngAfterViewInit(): void {
    // console.log(this.content, 'cccc');
  }

  onLogout() {
    this.authService.logout();
  }
  loginBtn(auth: any, type: any) {
    if (type === 1) {
      this.formTitle = 'Login';
      this.login = true;
    } else if (type === 2) {
      this.formTitle = 'Sign Up';
      this.login = false;
    }
    this.modalService.open(auth);
  }

  ClickedOut(event: any) {
    //debugger;
    if (event.target.className === 'hover_bkgr_fricc') {
      this.ispopUpShow = false;
    }
  }

  AuthLgn(event: any) {
    this.login = event;
    this.modalService.dismissAll(this.content);
    this.loginBtn(this.content, 2);
  }
  LoginFls(event:any){
    this.login = event;
    this.modalService.dismissAll(this.content);
    this.loginBtn(this.content, 1);
  }

  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
  }
}
