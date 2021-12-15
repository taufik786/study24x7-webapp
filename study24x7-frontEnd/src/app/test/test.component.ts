import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {

  constructor(private authService: AuthService) { }
tt: any;
  ngOnInit(): void {
    this.tt = this.authService.currentUserValue;
    console.log(this.tt,'tttt')

  }

}
