
import Exercise from '../models/exercise.model';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
//import {Response} from '@angular/http';
import { Injectable } from '@angular/core';
import { PagerService } from '../services/pages.service';
import { environment } from '../../environments/environment';
import { errorHandler } from './errorHandler.service';




@Injectable()
export class ExerciseService {

  api_url = environment.apiUrl || 'http://localhost:3000/api/';
  exercisesUrl = `${this.api_url}exercises`;

  constructor(
    private http: HttpClient,
    public pagerService : PagerService,
    private errorhandler:errorHandler
  ) { }


   createExercise(exercise : Exercise): Observable<any>{
    //returns the observable of http post request 
    return this.http.post(`${this.exercisesUrl}`, exercise);
  }

  //Read exercise, takes no arguments
  // getExercises(): Observable<Exercise[]>{
  //   return this.http.get(this.exercisesUrl)
  //   .map(res  => {
  //     //Maps the response object sent from the server
        
  //     return res["data"].docs as Exercise[];
  //   })
  // }

    getExercises(page: number): Observable<any>{
    	let url = this.exercisesUrl+'?page='+page
  //  	let url = this.exercisesUrl
    	let config = {'params' : {'page' : page }};
    	return this.http
        .get(url)
    		.map(res  => {
      	   return res["data"] as Exercise[];
          }
         ) 
        .catch(error => {
           return this.handleError(error);

        })
  }


  getExercise(id:Exercise['_id']): Observable<any>{

    let url = this.exercisesUrl+'/'+id
  //    let url = this.sessionUrl
    
    return this.http
      .get(url)
      .map(res  => {
            //Maps the response object sent from the server        
            return res["data"] as Exercise;
      })
      .catch(error => {
          return this.handleError(error);
      })




  }


  //Update exercise, takes a exercise Object as parameter
  editExercise(exercise:Exercise){

  	console.log('service exercise Edit :')
  	console.log(exercise)

    let editUrl = `${this.exercisesUrl}/${exercise._id}`
    //returns the observable of http put request 
    return this.http
      .put(editUrl, exercise)
   
  }

  deleteExercise(id:string):any{
    //Delete the object by the id
    let deleteUrl = `${this.exercisesUrl}/${id}`
    return this.http.delete(deleteUrl)
    // .map(res  => {
    //   return res;
    // })
  }

  //Default Error handling method.
  // private handleError(error: any): Promise<any> {
  //   console.error('An error occurred', error); // for demo purposes only
  //   return Promise.reject(error.message || error);
  // }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };


}
