import { Component, OnInit } from '@angular/core';
import { SessionService } from '../services/session.service';
import Session from '../models/session.model';
import { PagerService } from '../services/pages.service';
import { MatTableDataSource } from '@angular/material';

import { ActivatedRoute, Router } from '@angular/router';


import Page from '../models/pages.model';



@Component({
  selector: 'app-session-list',
  templateUrl: './session-list.component.html',
  styleUrls: ['./session-list.component.scss']
})


export class SessionListComponent implements OnInit {




  constructor(  	
  		private sessionService: SessionService,
  		private pagerService: PagerService,
  		private route: ActivatedRoute,
    	private router: Router,

		) { 




  }

  sessionsList : Session[];
  page: number=1;
  pagesInfo : Page = new Page();

  ngOnInit(): void {

    this.sessionService.getSessions(this.page)
      .subscribe(sessions => {
        //assign the todolist property to the proper http response
        this.sessionsList = sessions;
        this.pagesInfo = this.pagerService.getPager();



      })



      }


  showSession(id:number){

  	console.log('on a double le click');
  	console.log(id);
  	this.router.navigate(['/session/'+id]);

  }


  
}
