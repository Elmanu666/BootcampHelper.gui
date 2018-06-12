import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';



@Injectable()

export class userService {

	_baseURL: string = 'http://localhost:3000/api/user/login'

  constructor(private http: HttpClient) { }


  public signIn(username:string, password:string ) {
        return this.http.post( this._baseURL, {username, password})
            // this is just the HTTP call, 
            .catch(error => Observable.throw(error));
    }
}
