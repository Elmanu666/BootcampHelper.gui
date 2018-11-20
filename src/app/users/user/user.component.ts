import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { GeneralAnimations } from '../../animation/general.animations';
import { ActivatedRoute, Router, NavigationEnd  } from '@angular/router';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

	lateralMenuStatus:boolean;  


  	constructor(
  		private route: ActivatedRoute,
    	private router: Router,) 
  	{
  	 this.router.events.subscribe((res) => { 

         if (res instanceof NavigationEnd) {

               let params = res.url.split("/");
               params.length > 2 ? this.lateralMenuStatus = true : this.lateralMenuStatus =false;
               console.log('params: ');
               console.log(params);
               console.log('res.url:');
               console.log(res.url);
               console.log('this.lateralMenuStatus :');
               console.log(this.lateralMenuStatus);
           }
        
    }) 
     }

  ngOnInit() {
  


  }

}
