import Session from '../models/session.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import {Response} from '@angular/http';
import { Injectable } from '@angular/core';
import { PagerService } from '../services/pages.service';
import { environment } from '../../environments/environment';





@Injectable()
export class SessionService {

	api_url = environment.apiUrl || 'http://localhost:3000/api/';
  sessionsUrl = `${this.api_url}sessions`;
  sessionUrl = `${this.api_url}session`;

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


            this.pagerService.setPager(res["data"].pages, res["data"].page, res["data"].limit)

        
            return res["data"].docs as Session[];
      }) )

 
  }


  getSessionsByMonth(year: number, month:number){

    let fromDate: Date = new Date(year, month, 1);

    let toDate: Date ;
    month < 11 ? toDate = new Date(year, month+1, 0) : toDate = new Date(year+1, 0, 0) ;


    if (month < 10){
      console.log('month <10');

      var monthIn2Digit = "0"+String(month);
      console.log(monthIn2Digit)
    }

    else {

      var monthIn2Digit = String(month) ;
    }

    let queryDate = {'gt': fromDate} 
    let params = new HttpParams( {fromObject: {
        fromDate: fromDate.getFullYear()+'-'+monthIn2Digit+'-'+'01'+'T00:00:00',
        toDate: toDate.getFullYear()+'-'+monthIn2Digit+'-'+'30'+'T23:59:59',
      }
    })

//    params = params.append( 'startDate' , fromDate.toString());
//    params = params.append( 'endDate' , toDate.toString());
      return this.http.get(this.sessionsUrl, {params})
        .pipe(
            map(res=>{

              this.pagerService.setPager(res["data"].pages, res["data"].page, res["data"].limit);

              let docs = res["data"].docs;

              for (var i = 0 ; i < docs.length; i++){

                  var y = docs[i].plannedDate.substring(0, 4);
                  var m = docs[i].plannedDate.substring(5, 7)-1;
                  var d = docs[i].plannedDate.substring(8, 10);
                  var h = docs[i].plannedDate.substring(11, 13);
                  var mm = docs[i].plannedDate.substring(14, 16);
                  var s = docs[i].plannedDate.substring(17, 19);



                docs[i].plannedDate =  new Date(Date.UTC(y,m,d,h,mm,s))

              }


              return docs as Session[];


            }))

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


  editSession(session:Session){


    let editUrl = `${this.sessionsUrl}/${session._id}`
    //returns the observable of http put request 
    return this.http.put(editUrl, session);
  }






}
