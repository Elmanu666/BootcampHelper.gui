import { Component, OnInit } from '@angular/core';
import { SessionService } from '../../services/session.service';
import Session from '../../models/session.model';
import { PagerService } from '../../services/pages.service';
import { MatTableDataSource } from '@angular/material';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  query,
  stagger,
} from '@angular/animations';

import { ActivatedRoute, Router } from '@angular/router';


import Page from '../../models/pages.model';



@Component({
  selector: 'app-session-list',
  templateUrl: './session-list.component.html',
  styleUrls: ['./session-list.component.scss',],
  animations: [
      trigger('tableLine', [
          transition('void => *', 
            query('tr',[
              style({ opacity: 0 }),
              stagger(100, [
                  animate('0.2s', style({ opacity: 1 }))

              ])
             ])
            )
          ])
        ],

  // trigger('flyInOut', [
  //   state('in', style({transform: 'translateX(0)'})),
  //   transition('void => *', [
  //         style({transform: 'translateX(-100%)'}),
  //         animate(1000)
  //       ]),
  //   transition('* => void', [
  //         animate(1000, style({transform: 'translateX(100%)'}))
  //       ])
  //     ]),
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
  loaded : boolean = false;

  ngOnInit(): void {

    this.sessionService.getSessions(this.page)
      .subscribe(sessions => {
        //assign the todolist property to the proper http response
        this.sessionsList = sessions;
        this.pagesInfo = this.pagerService.getPager();
        this.loaded=true;



      })



      }


  showSession(id:number){

    console.log('on a double le click');
    console.log(id);
    this.router.navigate(['/session/detail/'+id]);

  }

  runSession(id:number){

  	console.log('on a clické');
  	console.log(id);
  	this.router.navigate(['/session/run/'+id]);

  }


  
}
