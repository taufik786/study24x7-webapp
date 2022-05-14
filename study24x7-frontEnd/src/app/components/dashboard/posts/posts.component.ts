import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import * as moment from 'moment';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/auth/auth.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit, AfterViewInit {
  postData: any = [];
  popup = false;
  @ViewChild('menuPopup', { static: false }) menuPopup!: ElementRef<any>;
  loggedUser: any;

  constructor(
    private postService: PostService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.user.subscribe((res) => {
      this.loggedUser = res.userId;
    });
    this.allPost();
  }

  allPostCall(event:any){
    this.allPost();
  }
  savePost(post: NgForm) {
    this.postService.createPost(post.value).subscribe(
      (res) => {
        this.allPost();
      },
      (err) => {
        console.log(err);
      }
    );
    post.reset();
  }

  allPost() {
    this.postService.AllPosts().subscribe(
      (res) => {
        this.postData = res.result;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  dateFromNow(time: any) {
    // return moment(time).format("DD-MMM-YY, h:mm a")
    return moment(time).fromNow();
  }

  ngAfterViewInit(): void {
    // console.log(this.menuPopup, 'aaaaaaa');
  }
  showPopup(e: any, event: any) {
    // console.log(e.target.parentNode.parentNode,'iiiiiiiiiiiiiii')
    const popupId: any = document.getElementById('popup_' + event);
    // popupId.style.display = 'none';
    if (popupId.style.display == 'none') {
      popupId.style.display = 'block';
    } else {
      popupId.style.display = 'none';
    }
  }
  singlePostRoute(post: any) {
    let postTitleUrl = '';
    const postTitle = post.post.split(' ');
    for (let i = 0; i < postTitle.length; i++) {
      postTitleUrl += postTitle[i].trim() + '-';
    }
    postTitleUrl = postTitleUrl
      .replace(/[,'".\s+]/g, '')
      .slice(0, -1)
      .toLowerCase();
    this.router.navigate(['/post/' + post._id + '/' + postTitleUrl]);
  }
}
