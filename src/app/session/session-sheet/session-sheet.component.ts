import { Component, OnInit,  Input, Output } from '@angular/core';
import SessionModel from '../../models/session.model';
import { SessionService } from '../../services/session.service';

@Component({
  selector: 'app-session-sheet',
  templateUrl: './session-sheet.component.html',
  styleUrls: ['./session-sheet.component.scss']
})
export class SessionSheetComponent implements OnInit {

	errors: Array<string> =[];
	@Input() idSession: SessionModel['_id']  ;
  @Input() session : SessionModel;
  loaded : boolean ;
  @Input()  vertical : boolean ;




  constructor(private sessionService: SessionService,) { }

  ngOnInit() {

    this.loaded = false;
    this.vertical == undefined ? this.vertical = true : '';
    if (this.idSession != undefined){
      console.log('on passe dans l-appel de l-api dans session-sheet')

      this.sessionService.getSession(this.idSession)
      .subscribe(session => {
        //assign the todolist property to the proper http response
        this.session = session;
        
//        this.defineUserMainExercise();
        this.loaded=true;

      })
    }

    else if (this.idSession == undefined && this.session != undefined){
      this.loaded=true;
    }
  }


  // defineUserMainExercise(){

  //   var sessionTmp = this.session.round.map(rd =>{
  //           if (rd.exercisesAlternatives.length > 0){
  //             var users = new Array();

  //             rd.exercisesAlternatives.forEach(excAlt =>
  //               excAlt.users.forEach(user=>

  //                 users.push(user)
  //                 )

  //               )
  //             var userMain = this.session.attendees.filter(attendee =>{

  //                  return !(users.include(attendee))
  //             }

             
  //               )

  //           rd.userMainExercises = userMain;
  //           }



  //             return rd;
      

  //         }
    


  //     )
  }


}


