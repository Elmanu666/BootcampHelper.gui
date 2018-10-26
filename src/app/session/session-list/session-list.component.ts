import { Component, OnInit } from '@angular/core';
import { SessionService } from '../../services/session.service';
import Session from '../../models/session.model';
import { PagerService } from '../../services/pages.service';
import { MatTableDataSource } from '@angular/material';
import { PagerComponent } from '../../common/pager/pager.component';

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

         pagerService.currentPage$.subscribe(
       page => {

         console.log('Material list : current page changed value')
         this.page != page ? (this.page=page, this.getSessions()) : '';
         


           }
       )




  }

  sessionsList : Session[];
  page: number=1;
  pagesInfo : Page = new Page();
  loaded : boolean = false;
  path: string;

  ngOnInit(): void {

        this.path = this.route.snapshot.routeConfig.path


    this.getSessions();



      }


  getSessions(){

    this.loaded=false;

    this.sessionService.getSessions(this.page)
      .subscribe(sessions => {
        //assign the todolist property to the proper http response
        this.sessionsList = sessions;
        this.pagesInfo = this.pagerService.getPager();
        this.loaded=true;



      })


  }

  sessionJump(id:Session['_id']){

   

    this.path == 'edit' ? this.router.navigate(['/session/edit/'+id]):'';
    this.path == 'detail' ? this.router.navigate(['/session/detail/'+id]):'';
    this.path == 'list' ? this.router.navigate(['/session/detail/'+id]):'';

  }




  
}
