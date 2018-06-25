
import { Response } from '@angular/http';
import { ExerciseService } from './services/exercise.service';
import Exercise from './models/exercise.model';
import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { PagerService } from './services/pages.service';
import Page from './models/pages.model';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  styleUrls: ['./app.component.scss']
  
  breadcrumb : string;
  breadcrumbs : [{'url':string, 'title':string}]

	  constructor(

	  	    public toastr: ToastrService,
	  	    
    		private router: Router,


    //Private todoservice will be injected into the component by Angular Dependency Injector


  ) {
      
	  	 this.router.events.subscribe((res) => { 
	  	 	console.log(res);
    		console.log(this.router.url,"Current URL");
     		if (res instanceof NavigationEnd) {
     			console.log('res.url');
     			console.log(res.url);
 	            this.breadcrumbUrl(res.url);
           }
    		
		}) 

      }


    breadcrumbUrl(url){

    	var urlSplited = url.split('/');
    	
    	this.breadcrumbs = [{'url':'/', 'title':'Home'}];

    	var urlAssembled = '';

    	for (var i = 1; i < urlSplited.length ; i++){

    		urlAssembled = urlAssembled+"/"+urlSplited[i];

    		this.breadcrumbs.push({'url': urlAssembled, 'title' : urlSplited[i]})  

    	}






    }

}