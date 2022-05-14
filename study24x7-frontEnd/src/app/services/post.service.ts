import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const postUrl = 'http://127.0.0.1:5000/post';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private http: HttpClient) {}

  createPost(body: any): Observable<any> {
    return this.http.post<any>(postUrl + '/create', body);
  }
  AllPosts(): Observable<any> {
    return this.http.get<any>(postUrl + '/allPost');
  }

  AddLike(body: any): Observable<any> {
    return this.http.post<any>(postUrl + '/add-like', body);
  }
  DisLike(body: any): Observable<any> {
    return this.http.post<any>(postUrl + '/dis-like', body);
  }

  SinglePost(id:any):Observable<any>{
    return this.http.get<any>(postUrl+ '/singlePost/'+id)
  }

  CommentPost(body:any):Observable<any>{
    return this.http.post<any>(postUrl+'/add-comment',body);
  }
}
