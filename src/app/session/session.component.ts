import { Component, OnInit } from '@angular/core';
import { SessionService } from '../services/session.service';
import Session from '../models/session.model';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { SessionDisplayComponent } from './session-display/session-display.component';
import { GeneralAnimations } from '../animation/general.animations';


import { ActivatedRoute, Router, NavigationEnd  } from '@angular/router';


@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.scss'],
   animations: GeneralAnimations,

})
export class SessionComponent implements OnInit {

  lateralMenuStatus:boolean;  


  constructor(
  	  private sessionService: SessionService,
  		private route: ActivatedRoute,
    	private router: Router,

  	) { 

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




  // 	let id = this.route.snapshot.paramMap.get('id');

  // 	console.log(id);


  // 	this.sessionService.getSession(id)
  //     .subscribe(session => {
  //       //assign the todolist property to the proper http response
  //       this.session = session;
  //       console.log("on reçoit la session");
  //       console.log(session);




  //     })
  // }

}

}
