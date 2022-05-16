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
import { SearchBoxService } from '../services/searchBox.service';
import { Router } from '@angular/router';

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
  searchText: any = '';
  allSearchedData:any = [];
  searchResultAll = false;
  isSearchData = true;
  isNotFound = false;
  noSearchData: any;

  constructor(
    private authService: AuthService,
    private modalService: NgbModal,
    private searchBoxService: SearchBoxService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authListenerSubs = this.authService.user.subscribe((res) => {
      this.userAuthenticated = !!res;
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
  LoginFls(event: any) {
    this.login = event;
    this.modalService.dismissAll(this.content);
    this.loginBtn(this.content, 1);
  }

  searchBocTouched(){
    this.searchResultAll = true;
  }

  searchBox(event:any) {
    this.searchText = this.searchText.trim();
    if (this.searchText == '') {
      console.log(event.keyCode)
      if(event.keyCode == '13') {
        this.searchResultAll = false;
        this.router.navigate(['/home/all'])
      }
      this.isSearchData = false;
      this.isNotFound = false;
      return;
    }
    this.searchResultAll = true;
    this.searchBoxService.SearchApi(this.searchText).subscribe((res:any) => {
      this.isSearchData = true;
      this.isNotFound = false;
      this.allSearchedData = res.result;
    }, err => {
      this.isSearchData = false;
      this.isNotFound = true;
      this.noSearchData = err.error.message;
    });
  }

  closePopUpSearchbox(event:any){
    if(event.target.id !== 'search-box-input' && event.target.id !== 'search-result-data'){
      this.searchResultAll = false;
    }
  }

  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
  }
}
