import { Component, OnInit } from '@angular/core';
import { SessionService } from '../services/session.service';
import Session from '../models/session.model';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { SessionDisplayComponent } from '../session-display/session-display.component';

import { ActivatedRoute, Router,  } from '@angular/router';


@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.scss']
})
export class SessionComponent implements OnInit {

  constructor(
  	  	private sessionService: SessionService,
  		private route: ActivatedRoute,
    	private router: Router,

  	) { }

  session: Session;

  ngOnInit() {

  	let id = this.route.snapshot.paramMap.get('id');

  	console.log(id);


  	this.sessionService.getSession(id)
      .subscribe(session => {
        //assign the todolist property to the proper http response
        this.session = session;
        console.log("on reçoit la session");
        console.log(session);




      })
  }

}
