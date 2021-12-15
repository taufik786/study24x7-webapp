import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-home-all',
  templateUrl: './home-all.component.html',
  styleUrls: ['./home-all.component.scss']
})
export class HomeAllComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.getIsAuth();
    // let user = this.authService.currentUserValue;
    // console.log(user,'tttttttttttt')
  }

}
