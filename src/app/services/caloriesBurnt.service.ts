import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import CaloriesBurnt from '../models/caloriesBurnt.model';
import { map } from 'rxjs/operators';
import {Response} from '@angular/http';
import { PagerService } from '../services/pages.service';
import { environment } from '../../environments/environment';






@Injectable()

export class CaloriesBurntService {

	_baseURL: string = environment.apiUrl+'caloriesburnt/' || 'http://localhost:3000/api/caloriesburnt/'

  	constructor(
	  	private http: HttpClient,
	  	public pagerService : PagerService
		) { }





    createCaloriesBurnt(caloriesBurnt : CaloriesBurnt): Observable<any>{

    //returns the observable of http post request 
    return this.http.post(this._baseURL, caloriesBurnt);
  	}


  	 createCaloriesBurnts(caloriesBurnts : CaloriesBurnt[]): Observable<any>{

  	 	var data = caloriesBurnts.map(rObj => {
  	 		return {'userId': rObj.userId._id, 'amount': rObj.amount, 'sessionId': rObj.sessionId._id}

  	 	})

    //returns the observable of http post request 
    return this.http.post(this._baseURL+"/several/", data);
  	}

	getCaloriesBurnts(): Observable<CaloriesBurnt[]>{


	    return this.http.get(this._baseURL)
	        .pipe(

	          map(res  => {

	            //Maps the response object sent from the server


	         //   this.pagerService.setPager(res["data"].pages, res["data"].page, res["data"].limit)

	        
	            return res["data"] as CaloriesBurnt[];
	      }) )

 
	}

	getCaloriesBurnt(id:CaloriesBurnt['_id']): Observable<CaloriesBurnt>{

	    return this.http.get(this._baseURL+id)
	        .pipe(

	          map(res  => {
	            //Maps the response object sent from the server        
	            return res["data"] as CaloriesBurnt;
	      }) )

	   



 	}


	deleteCaloriesBurnt(id: string):any{

		return this.http.delete(this._baseURL+'id')

	}


	editCaloriesBurnt(user:CaloriesBurnt){

		return this.http.put(this._baseURL+user._id, user);
	}

	private handleError(error: any): Promise<any> {
	    console.error('An error occurred', error); // for demo purposes only
	    return Promise.reject(error.message || error);
	  }




}
