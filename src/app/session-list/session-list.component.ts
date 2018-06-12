import { Component, OnInit } from '@angular/core';
import { SessionService } from '../services/session.service';
import Session from '../models/session.model';

@Component({
  selector: 'app-session-list',
  templateUrl: './session-list.component.html',
  styleUrls: ['./session-list.component.scss']
})
export class SessionListComponent implements OnInit {



  constructor() { }

  sessionList : [Session];
  page: number=1;

  ngOnInit(): void {

  	this.SessionService.getSessions(this.page)
      .subscribe(exercises => {
        //assign the todolist property to the proper http response
        this.sessionList = exercises;
//        this.pagesInfo = this.pagerService.getPager();



      })


  }

}
