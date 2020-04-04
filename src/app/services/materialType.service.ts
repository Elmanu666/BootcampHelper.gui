import { Injectable } from '@angular/core';
import Material from '../models/material.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
//import {Response} from '@angular/http';
import { PagerService } from '../services/pages.service';
import { environment } from '../../environments/environment';
import MaterialType from '../models/materialType.model';



@Injectable()
export class MaterialTypeService {


	materialType : MaterialType[];
	api_url = environment.apiUrl || 'http://localhost:3000/api/';
  	materialUrl = `${this.api_url}materialType`;

	constructor(
		    private http: HttpClient,

  	) { 
		this.materialType = new Array();

	}


	addMaterialType(material:any){

		this.materialType.push(material)




	}

	getMaterialType(): Observable<any>{
		debugger;
		if (this.materialType.length > 0){

			 return new Observable((observer) => {

				 
				  // When the consumer unsubscribes, clean up data ready for next subscription.
				  observer.next(this.materialType);
				  observer.complete();

				});
				

		}
		else {

			return this.http
        		.get(this.materialUrl)
    			.map(res  => {

    				this.materialType = res["data"];
      	    		return res["data"] as MaterialType[];


            		}
          		)
        		.catch(error=> {

          			return (error)
          		}
          		) 
			}

	}

}


