
import Exercise from '../models/exercise.model';
import { Observable } from 'rxjs/Rx';
import { map } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {Response} from '@angular/http';
import { Injectable } from '@angular/core';
import { PagerService } from '../services/pages.service';


@Injectable()
export class ExerciseService {

  api_url = 'http://localhost:3000';
  exerciseUrl = `${this.api_url}/api/exercises`;

  constructor(
    private http: HttpClient,
    public pagerService : PagerService
  ) { }


   createExercise(exercise : Exercise): Observable<any>{
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

    getExercises(page: number): Observable<Exercise[]>{
    	let url = this.exerciseUrl+'?page='+page
  //  	let url = this.exerciseUrl
    	let config = {'params' : {'page' : page }};
    	return this.http.get(url)
    		.pipe(

    			map(res  => {
      			//Maps the response object sent from the server
      			console.log('donnée envoyer pour le pager');
      			console.log(res['data']);

          		this.pagerService.setPager(res["data"].pages, res["data"].page, res["data"].limit)

        
      	return res["data"].docs as Exercise[];
    }) )
  }
  //Update exercise, takes a exercise Object as parameter
  editExercise(exercise:Exercise){

  	console.log('service exercise Edit :')
  	console.log(exercise)

    let editUrl = `${this.exerciseUrl}/${exercise._id}`
    //returns the observable of http put request 
    return this.http.put(editUrl, exercise);
  }

  deleteExercise(id:string):any{
    //Delete the object by the id
    let deleteUrl = `${this.exerciseUrl}/${id}`
    return this.http.delete(deleteUrl)
    // .map(res  => {
    //   return res;
    // })
  }

  //Default Error handling method.
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }


}