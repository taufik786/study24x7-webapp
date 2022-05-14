import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import * as _ from 'lodash';
import { AuthService } from 'src/app/auth/auth.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-post-footer',
  templateUrl: './post-footer.component.html',
  styleUrls: ['./post-footer.component.scss']
})
export class PostFooterComponent implements OnInit {

  postBtn = false;
  @Input() post: any;
  loggedUser: any;
  @Output() allPostCall = new EventEmitter;

  constructor(
    private authService: AuthService,
    private postService: PostService) { }

  ngOnInit(): void {
    this.authService.user.subscribe((res) => {
      this.loggedUser = res.userId;
    });
  }
  editableComment(event: any) {
    console.log(event.innerText);
    if (event.innerText.length >= 1) {
      this.postBtn = true;
    } else {
      this.postBtn = false;
    }
  }

  checkInArray(arr: any, userId: any) {
    // console.log(arr,userId,'uuuuuuuu')
    return _.some(arr, { userId: userId });
  }

  likedPost(post: any, type: any) {
    let likesData: any;
    const userData = {
      id: post._id,
      name: post.userName,
    };
    if (type == 'like') {
      likesData = this.postService.AddLike(userData);
    } else if (type == 'dislike') {
      likesData = this.postService.DisLike(userData);
    }

    likesData.subscribe((res: any) => {
      this.allPostCall.emit(true);
    });
  }

  comment(postId: any) {
    var commentTxt: any = document.getElementById('comment_' + postId);
    let cmnt = commentTxt;
    commentTxt = commentTxt.innerText;
    const data = {
      postId,
      commentTxt,
    };
    this.postService.CommentPost(data).subscribe((res) => {
      cmnt.innerText = '';
      this.allPostCall.emit(true);
    });
  }

}
