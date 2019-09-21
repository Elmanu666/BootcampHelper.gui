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
import { NgxSpinnerService } from 'ngx-spinner';




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
      private spinner: NgxSpinnerService



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
  sortingInfo : any[];


  ngOnInit(): void {

    this.path = this.route.snapshot.routeConfig.path
    this.getSessions();
    this.sortingInfo = new Array();
    }


  getSessions(){
    this.spinner.show();
    this.loaded=false;

    this.sessionService.getSessions(this.page)
      .subscribe(sessions => {
        //assign the todolist property to the proper http response
        this.sessionsList = sessions;
        this.pagesInfo = this.pagerService.getPager();

          setTimeout(() => {
            this.loaded = true;
            this.spinner.hide();
            }, 200);



      })


  }

  sessionJump(id:Session['_id']){

   

    this.path == 'edit' ? this.router.navigate(['/session/edit/'+id]):'';
    this.path == 'detail' ? this.router.navigate(['/session/detail/'+id]):'';
    this.path == 'list' ? this.router.navigate(['/session/detail/'+id]):'';

  }


  sortBy(criteria){

    var data = this.sortingInfoGetSorting(criteria);
    console.log('sorting :', data);
    console.log('sortingInfo :', this.sortingInfo);
    

    data.sort == 'asc' ? this.sessionsList.sort((a,b) => a[data.criteria].localeCompare(b[data.criteria])) : this.sessionsList.sort((a,b) => b[data.criteria].localeCompare(a[data.criteria]));

//    this.sessionsList.sort((a,b) => a[criteria].localeCompare(b[criteria]))



  }

  sortingInfoGetSorting(criteria){
    var sortingInfoExist = false;
    var index = 0 ;
    var data = {'criteria':criteria, 'sort':''};

     for (var v = 0; v < this.sortingInfo.length; v++)
      {
      if (this.sortingInfo[v].criteria == criteria ){
        this.sortingInfo[v].sort == 'asc' ? this.sortingInfo[v].sort = 'dsc' :this.sortingInfo[v].sort = 'asc';
        sortingInfoExist = true;
        index = v;

        }
      }

    sortingInfoExist == false ? this.sortingInfo.push({'criteria': criteria, 'sort': 'asc'}) : '';
    sortingInfoExist == false ? data.sort = 'asc' : data.sort = this.sortingInfo[index].sort;

    return data


  }




  
}
