
import { Response } from '@angular/http';
import { ExerciseService } from './services/exercise.service';
import Exercise from './models/exercise.model';
import MenuItem from './models/menuItem.model';
import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { PagerService } from './services/pages.service';
import Page from './models/pages.model';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { GeneralAnimations } from './animation/general.animations';
import { MenuService } from './services/menu.service';






@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: GeneralAnimations,

})
export class AppComponent {
  
  breadcrumb : string;
  breadcrumbs : [{'url':string, 'title':string}]
  menus : Array<MenuItem>;
  menuSelected : Array<MenuItem>;
  section: string;
  lateralMenuStatus

	  constructor(

	  	    public toastr: ToastrService,
	  	    
    		private router: Router,
        private menuservice : MenuService,


    //Private todoservice will be injected into the component by Angular Dependency Injector


  ) {
      
	  	 this.router.events.subscribe((res) => { 

     		if (res instanceof NavigationEnd) {
              let params = res.url.split("/");
              console.log('res : ');
              console.log(res);

              params.length > 2 ? this.lateralMenuStatus = true : this.lateralMenuStatus =false;

 	            this.breadcrumbUrl(res.url);
               this.setLateralMenu();
           }
    		
		}) 

      }


    breadcrumbUrl(url){

    	var urlSplited = url.split('/');
    	
    	this.breadcrumbs = [{'url':'/', 'title':'Home'}];

    	var urlAssembled = '';

    	for (var i = 1; i < urlSplited.length ; i++){

        i == 1 ? this.section= urlSplited[i]: '';

        console.log('this.section :'+this.section);

    		urlAssembled = urlAssembled+"/"+urlSplited[i];

    		this.breadcrumbs.push({'url': urlAssembled, 'title' : urlSplited[i]})  

    	}


    }



    setLateralMenu()
    {


       this.menus = this.menuservice.getMenuItems(this.section);

       this.menuSelected = this.menus;


     }
      
    //     this.menus=[
    //   {'title':'Edit', 'section':'session', 'link':'edit', 'icon': null, 'detail': 'blabla', 'size':2, 'line':0, 'color':'blue', 'ico':'fas fa-dumbbell', 'state': 'inactive'},
    //   {'title':'List', 'section':'session','link':'list', 'icon': null, 'detail': 'blabla', 'size':2, 'line':0, 'color': 'grey', 'ico':'far fa-list-alt', 'state': 'inactive'},
    //   {'title':'View','section':'session', 'link':'view', 'icon': null, 'detail': 'blabla', 'size':1,  'line':1, 'color': 'blue','ico':'far fa-eye', 'state': 'inactive'},
    //   {'title':'Run','section':'session', 'link':'run', 'icon': null, 'detail': 'blabla', 'size':2, 'line':1, 'color': 'blue','ico':'fas fa-dumbbell', 'state': 'inactive'},
    //   {'title':'Create', 'section':'session' , 'link':'create', 'icon': null, 'detail': 'blabla', 'size':1, 'line':1, 'color': 'blue','ico':'far fa-plus-square', 'state': 'inactive'},
    //   {'title':'Edit', 'section':'exercise', 'link':'edit', 'icon': null, 'detail': 'blabla', 'size':2, 'line':0, 'color':'blue', 'ico':'fas fa-dumbbell', 'state': 'inactive'},
    //   {'title':'List', 'section':'exercise','link':'list', 'icon': null, 'detail': 'blabla', 'size':2, 'line':0, 'color': 'grey', 'ico':'far fa-list-alt', 'state': 'inactive'},
    //   {'title':'View','section':'exercise', 'link':'view', 'icon': null, 'detail': 'blabla', 'size':1,  'line':1, 'color': 'blue','ico':'far fa-eye', 'state': 'inactive'},
    //   {'title':'Run','section':'exercise', 'link':'run', 'icon': null, 'detail': 'blabla', 'size':2, 'line':1, 'color': 'blue','ico':'fas fa-dumbbell', 'state': 'inactive'},
    //   {'title':'Create', 'section':'exercise' , 'link':'create', 'icon': null, 'detail': 'blabla', 'size':1, 'line':1, 'color': 'blue','ico':'far fa-plus-square', 'state': 'inactive'},


    // ];
    // console.log(this.section);



    
    // this.menuSelected = new Array();

    // for (var j=0; j< this.menus.length; j++){

    //   this.menus[j].section == this.section ? ( this.menuSelected.length >0 ? this.menuSelected.push(this.menus[j]): this.menuSelected[0]=this.menus[j] ): console.log(this.menus[j].section);

    // }


      
    // }

}