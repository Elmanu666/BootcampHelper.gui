
import Exercise from '../models/exercise.model';
import { Observable } from 'rxjs/Rx';
import { map } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {Response} from '@angular/http';
import { Injectable } from '@angular/core';


@Injectable()
export class ExerciseService {

  api_url = 'http://localhost:3000';
  exerciseUrl = `${this.api_url}/api/exercises`;

  constructor(
    private http: HttpClient
  ) { }


   createExercise(exercise: Exercise): Observable<any>{
    //returns the observable of http post request 
    return this.http.post(`${this.exerciseUrl}`, exercise);
  }

  //Read exercise, takes no arguments
  // getExercises(): Observable<Exercise[]>{
  //   return this.http.get(this.exerciseUrl)
  //   .map(res  => {
  //     //Maps the response object sent from the server
        
  //     return res["data"].docs as Exercise[];
  //   })
  // }

    getExercises(): Observable<Exercise[]>{
    return this.http.get(this.exerciseUrl)
    .pipe(

    	map(res  => {
      //Maps the response object sent from the server
        
      return res["data"].docs as Exercise[];
    }) )
  }
  //Update exercise, takes a exercise Object as parameter
  editExercise(exercise:Exercise){
    let editUrl = `${this.exerciseUrl}`
    //returns the observable of http put request 
    return this.http.put(editUrl, exercise);
  }

  deleteExercise(id:string):any{
    //Delete the object by the id
    let deleteUrl = `${this.exerciseUrl}/${id}`
    return this.http.delete(deleteUrl)
    .map(res  => {
      return res;
    })
  }

  //Default Error handling method.
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }


}