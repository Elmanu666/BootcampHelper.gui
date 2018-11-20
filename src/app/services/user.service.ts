import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import User from '../models/user.model';
import { map } from 'rxjs/operators';
import {Response} from '@angular/http';
import { PagerService } from '../services/pages.service';





@Injectable()

export class UserService {

	_baseURL: string = 'http://localhost:3000/api/user/'

  	constructor(
	  	private http: HttpClient,
	  	public pagerService : PagerService
		) { }


  	public signIn(username:string, password:string ) {
        return this.http.post( this._baseURL+'login', {username, password})
            // this is just the HTTP call, 
            .catch(error => Observable.throw(error));
    }


    createUser(user : User): Observable<any>{
     console.log(user);
    //returns the observable of http post request 
    return this.http.post(this._baseURL, user);
  }

	getUsers(): Observable<User[]>{


	    return this.http.get(this._baseURL)
	        .pipe(

	          map(res  => {

	            //Maps the response object sent from the server


	         //   this.pagerService.setPager(res["data"].pages, res["data"].page, res["data"].limit)

	        
	            return res["data"] as User[];
	      }) )

 
	}

	getUser(id:User['_id']): Observable<User>{

	    return this.http.get(this._baseURL+id)
	        .pipe(

	          map(res  => {
	            //Maps the response object sent from the server        
	            return res["data"] as User;
	      }) )

	   



 	}


	deleteUser(id: string):any{

		return this.http.delete(this._baseURL+'id')

	}


	editUser(user:User){

		return this.http.put(this._baseURL+user._id, user);
	}

	private handleError(error: any): Promise<any> {
	    console.error('An error occurred', error); // for demo purposes only
	    return Promise.reject(error.message || error);
	  }




}
