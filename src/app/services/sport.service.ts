import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
//import {Response} from '@angular/http';
import { PagerService } from '../services/pages.service';
import { environment } from '../../environments/environment';
import Sport from '../models/sport.model';



@Injectable()
export class SportService {


	sport : Sport[];
	api_url = environment.apiUrl || 'http://localhost:3000/api/';
  	materialUrl = `${this.api_url}sport`;

	constructor(
		    private http: HttpClient,

  	) { 
		this.sport = new Array();

	}


	addSport(material:any){

		this.sport.push(material)




	}

	getSport(): Observable<any>{
		if (this.sport.length > 0){

			 return new Observable((observer) => {

				 
				  // When the consumer unsubscribes, clean up data ready for next subscription.
				  observer.next(this.sport);
				  observer.complete();

				});
				

		}
		else {

			return this.http
        		.get(this.materialUrl)
    			.map(res  => {

    				this.sport = res["data"];
      	    		return res["data"] as Sport[];


            		}
          		)
        		.catch(error=> {

          			return (error)
          		}
          		) 
			}

	}

}


