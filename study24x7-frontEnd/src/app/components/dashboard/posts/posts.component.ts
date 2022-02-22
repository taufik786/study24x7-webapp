import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import * as moment from 'moment';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-wall',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit, AfterViewInit {
  postData: any = [];
  popup = false;
  @ViewChild('menuPopup', { static: false }) menuPopup!: ElementRef<any>;

  constructor(private postService: PostService) {}

  ngOnInit(): void {
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
        console.log(res);
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

  likedPost(post:any){
    console.log(post,'pppp')
    const userData = {
      id: post._id,
      name: post.userName
    }
    this.postService.AddLike(userData).subscribe(res => {
      console.log(res,'rrrr')
    })
  }

  checkInArray(arr:any, userId:any){
    for (let i = 0; i < arr.length; i++) {
      console.log(arr[i].userId);
      if(arr[i].userId === userId) {

      }

    }
    return arr
    // console.log(arr,'aaa',userId)
  }
}
