import File from '../models/file.model';
import { environment } from '../../../environments/environment';
import { map, catchError } from 'rxjs/operators';


import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';



@Injectable()
export class FileService {
      api_url = environment.apiUrl || 'http://localhost:3000/api/';
    _baseURL: string = this.api_url +'files';
    constructor(private http: HttpClient) { }

 //   upload(files, parameters){
    upload(files){
        // let headers = new Headers();
        // let options = new RequestOptions({ headers: headers });
        // options.params = parameters;

    //     console.log('affichage des paramétres');
    //     console.log(parameters);

    //     const httpOptions = {headers: new HttpHeaders({
    // 	'params':  'tests',
  		// })};

        // let httpOptions = new HttpHeaders();
        // httpOptions.append('params', 'test')
        // httpOptions.append('params' , parameters);
        return  this.http.post(this._baseURL , files)
                 
                 .catch(error => Observable.throw(error));

    }
    getImages(id) : any{
        return this.http.get(this._baseURL + "?exerciseId="+id)
        .pipe(catchError(error => Observable.throw(error)))
                   
                   
    }

    deleteImage(id) : any{

    	 let deleteUrl = `${this._baseURL}/${id}`
    	return this.http.delete(deleteUrl)


    }

    getHttpImages(url):Observable<any>{
  

        return this.http.get(url, {responseType: 'blob'});
            
    }
    
}