import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
const searchApi = 'http://127.0.0.1:5000/search';

@Injectable({
  providedIn: 'root'
})

export class SearchBoxService {

  constructor(private http: HttpClient){}

  SearchApi(searchText:any):Observable<any>{
    return this.http.get<any>(`${searchApi}/${searchText}`)
  }
}
