import Session from '../models/session.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {Response} from '@angular/http';
import { Injectable } from '@angular/core';
import { PagerService } from '../services/pages.service';




@Injectable()
export class SessionService {

	api_url = 'http://localhost:3000';
    sessionsUrl = `${this.api_url}/api/sessions`;
  	sessionUrl = `${this.api_url}/api/session`;

  constructor(
    private http: HttpClient,
    public pagerService : PagerService
  ) { }  


   createSession(session : Session): Observable<any>{
     console.log(session);
    //returns the observable of http post request 
    return this.http.post(`${this.sessionsUrl}`, session);
  }

  getSessions(page: number): Observable<Session[]>{

    let url = this.sessionsUrl+'?page='+page
  //    let url = this.sessionUrl
    let config = {'params' : {'page' : page }};
    return this.http.get(url)
        .pipe(

          map(res  => {
            //Maps the response object sent from the server
            console.log('donnée envoyer pour le pager');
            console.log(res['data']);

            this.pagerService.setPager(res["data"].pages, res["data"].page, res["data"].limit)

        
            return res["data"].docs as Session[];
      }) )

 
  }

  getSession(id:Session['_id']): Observable<Session>{

    let url = this.sessionUrl+'/'+id
  //    let url = this.sessionUrl
    
    return this.http.get(url)
        .pipe(

          map(res  => {
            //Maps the response object sent from the server        
            return res["data"] as Session;
      }) )




  }


  deleteSession(id: string):any{
    //Delete the object by the id
    let deleteUrl = `${this.sessionUrl}/${id}`
    return this.http.delete(deleteUrl)
    // .map(res  => {
    //   return res;
    // })
  }







}
