
import Material from '../models/material.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
//import {Response} from '@angular/http';
import { Injectable } from '@angular/core';
import { PagerService } from '../services/pages.service';
import { environment } from '../../environments/environment';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';





@Injectable()
export class MaterialService {

  api_url = environment.apiUrl || 'http://localhost:3000/api/';
  materialUrl = `${this.api_url}material`;

  constructor(
    private http: HttpClient,
    public pagerService : PagerService,
    private spiner:NgxSpinnerService,
    private toastr: ToastrService,
  ) { }


   createMaterial(material : Material): Observable<any>{

     let datatoSend = {
        title: material.title,
        description: material.description,
        weigth : material.weigth,
        length : material.length,
        size : material.size,
        strength : material.strength,
        type: material.type._id,
        quantity: material.quantity,


     }

    //returns the observable of http post request 
    return this.http.post(`${this.materialUrl}`, datatoSend);
  }

  //Read exercise, takes no arguments
  // getExercises(): Observable<Exercise[]>{
  //   return this.http.get(this.materialUrl)
  //   .map(res  => {
  //     //Maps the response object sent from the server
        
  //     return res["data"].docs as Exercise[];
  //   })
  // }

    getMaterials(page: number): Observable<any>{
      let url = this.materialUrl+'?page='+page

    	let config = {'params' : {'page' : page }};  	

      return this.http
        .get(url)
    		.map(res  => {


      	    return res["data"] as Material[];


            }
          )
        .catch(error=> {

          return this.handleError(error)}
          ) 
        
    }


  getMaterial(id:Material['_id']): Observable<Material>{

    let url = this.materialUrl+'/'+id
  //    let url = this.sessionUrl
    
    return this.http.get(url)
        .pipe(

          map(res  => {
            //Maps the response object sent from the server        
            return res["data"] as Material;
      }) )




  }


  //Update exercise, takes a exercise Object as parameter
  editMaterial(material:Material){

  	console.log('service exercise Edit :')
  	console.log(material)

    let editUrl = `${this.materialUrl}/${material._id}`
    //returns the observable of http put request 
    return this.http.put(editUrl, material);
  }

  deleteMaterial(id:string):any{
    //Delete the object by the id
    let deleteUrl = `${this.materialUrl}/${id}`
    return this.http.delete(deleteUrl)
    // .map(res  => {
    //   return res;
    // })
  }

  //Default Error handling method.
  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }


}
