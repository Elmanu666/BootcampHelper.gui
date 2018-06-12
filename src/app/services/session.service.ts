import Session from '../models/session.model';
import { Observable } from 'rxjs/Rx';
import { map } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {Response} from '@angular/http';
import { Injectable } from '@angular/core';
import { PagerService } from '../services/pages.service';




@Injectable()
export class SessionService {

	api_url = 'http://localhost:3000';
  	exerciseUrl = `${this.api_url}/api/sessions`;

  constructor(
    private http: HttpClient,
    public pagerService : PagerService
  ) { }


   createSession(session : Session): Observable<any>{
    //returns the observable of http post request 
    return this.http.post(`${this.exerciseUrl}`, session);
  }







}
