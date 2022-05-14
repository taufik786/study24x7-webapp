import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import * as _ from 'lodash';
import * as moment from 'moment';
import { AuthService } from 'src/app/auth/auth.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.scss'],
})
export class SinglePostComponent implements OnInit {
  postId: any;
  postData: any = [];
  popup = false;
  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((res) => {
      this.postId = res['id'];
    });
    this.singlePost();
  }

  singlePost() {
    console.log(this.postId);
    this.postService.SinglePost(this.postId).subscribe((res) => {
      this.postData = res.result;
      console.log(res);
    });
  }

  dateFromNow(time: any) {
    return moment(time).fromNow();
  }

  showPopup() {
    this.popup = !this.popup;
  }

  allPostCall(event: any) {
    this.singlePost();
  }
}
