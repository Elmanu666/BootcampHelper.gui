
import Material from '../models/material.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {Response} from '@angular/http';
import { Injectable } from '@angular/core';
import { PagerService } from '../services/pages.service';


@Injectable()
export class MaterialService {

  api_url = 'http://localhost:3000';
  materialUrl = `${this.api_url}/api/material`;

  constructor(
    private http: HttpClient,
    public pagerService : PagerService
  ) { }


   createMaterial(material : Material): Observable<any>{
    //returns the observable of http post request 
    return this.http.post(`${this.materialUrl}`, material);
  }

  //Read exercise, takes no arguments
  // getExercises(): Observable<Exercise[]>{
  //   return this.http.get(this.materialUrl)
  //   .map(res  => {
  //     //Maps the response object sent from the server
        
  //     return res["data"].docs as Exercise[];
  //   })
  // }

    getMaterials(page: number): Observable<Material[]>{
      let url = this.materialUrl+'?page='+page
   // 	let url = this.materialUrl
  //  	let url = this.materialUrl
    	let config = {'params' : {'page' : page }};
    	return this.http.get(url)
    		.pipe(

    			map(res  => {
      			//Maps the response object sent from the server
      			console.log('donnée envoyer pour le pager');
      			console.log(res['data']);

     //     		this.pagerService.setPager(res["data"].pages, res["data"].page, res["data"].limit)

        
   //     return res["data"].docs as Exercise[];
      	return res["data"] as Material[];
    }) )
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
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }


}
