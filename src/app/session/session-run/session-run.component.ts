import { Component, OnInit, ViewChild, ChangeDetectionStrategy, TemplateRef} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import SessionModel from '../../models/session.model';
import ExerciseModel from '../../models/exercise.model';
import EventModel from '../../calendar/calendar.model';
import { SessionService } from '../../services/session.service';
import { ToastrService } from 'ngx-toastr';

import { CountdownComponent } from '../../countdown/countdown.component';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';
import { CalendarComponent } from '../../calendar/calendar.component'

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3'
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF'
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA'
  }
};



@Component({
  selector: 'app-session-run',
  templateUrl: './session-run.component.html',
  styleUrls: ['./session-run.component.scss'],
  animations: [
  trigger('flyInOut', [
    state('in', style({transform: 'translateX(0)'})),
    transition('void => *', [
      style({transform: 'translateX(-100%)'}),
      animate(1000)
    ]),
    transition('* => void', [
      animate(1000, style({transform: 'translateX(100%)'}))
    ])
  ]),
  trigger('flyinOutRight', [
  	transition('void => *', [
  		animate(1000, style({transform: 'translateX(100%)'}))

  		]),

  	transition('* => void', [
      animate(1000, style({transform: 'translateX(0)'}))
    ])

  	]),
  trigger('flyDown', [
  	transition('void => *', [
  		style({transform: 'translateY(-100%)'}),
  		animate(500)

  		]),
  	]),
  trigger('fadeIn', [
  	state('void', style({
        transform: 'scale(0.1)'
      })),
  	 state('*', style({
        transform: 'scale(1)'
      })),
  	transition ('void => *', animate('800ms ease-in'))
  	])
]
})
export class SessionRunComponent implements OnInit {


	@ViewChild(CountdownComponent) countdowncomponent: CountdownComponent;




  viewDate: Date = new Date();
	errors: Array<string> =[];
	session: SessionModel  ;
  sessions: SessionModel[];
  eventsSession : EventModel[];
  calendar : boolean ;
	sessionExpended : SessionModel;
	loaded : boolean = false;
	idSession : SessionModel['_id'];
	currentExercise : {'round':number, 'exercise':number, 'drills':boolean, 'repeat':number};
	started:boolean;
	roundsStarted :boolean=false;
  sessionFinished : boolean =false;
	progressBar:boolean=true;

   







  constructor(
  		private route: ActivatedRoute,
  		private sessionService: SessionService,
  		public toastr: ToastrService,



  	) { }

  ngOnInit() {

    this.route.snapshot.paramMap.get('id') != null ? (this.calendar = false , this.idSession = this.route.snapshot.paramMap.get('id'), this.loaded=false):  (this.calendar =true);
  	this.progressBar = true;
  	this.currentExercise = {'round':0, 'exercise':0, 'drills':false, 'repeat':1};
  	this.started=false;

    if(!this.calendar){      

        this.sessionService.getSession(this.idSession)
            .subscribe(sessionApi => {
              this.session = sessionApi;
              console.log('on a recuperer la sessions');
              console.log(this.session);
              this.loaded = true;

      })

     }

     else {

       var dd = new Date();

       var y = dd.getFullYear();
       var m = dd.getMonth();

       this.sessionService.getSessionsByMonth(y, m)
         .subscribe(sessionApi => {
              
              this.sessions = sessionApi;
              this.sessionToEvent();
              this.loaded = true;

      })

     }


  }


    startSession(){
    this.started=true;
  //  setTimeout(()=>{this.initRound()}, 500 ) ;


    }

  initRound(){
    this.roundsStarted = false;

  //  this.countdowncomponent.setDuration(this.session.round[0].restDuration);
  }




  startRounds(){
    this.roundsStarted = true;
    setTimeout(()=>{
          this.countdowncomponent.setDuration(this.session.round[this.currentExercise.round].restDuration);

          setTimeout(()=>{

                      this.startCountDown();


          }, 900);
    }, 100);


  //  this.countdowncomponent.startCountDown();
  
  }

  continueRounds(){

    this.roundsStarted = true;
    this.countdowncomponent.startCountDown();


  }


  pauseRounds(){
    this.countdowncomponent.pauseCountDown();
    this.roundsStarted = false;


  }

  stopRounds(){
    this.countdowncomponent.stopCountDown();
    this.roundsStarted = false;



  }

  startCountDown(){

    this.countdowncomponent.startCountDown();


  }

  stopCountDown(){

    this.countdowncomponent.stopCountDown();


  }

  finishSession(){

    console.log('on est dans le finishSession');

    this.countdowncomponent.stopCountDown();
    this.started=false;
    this.roundsStarted = false;
    this.sessionFinished=true;



  }

  // transform Sessions to Events object to be displayed on the calendar
  sessionToEvent(){

    this.eventsSession = new Array();

    for (var i =0; i< this.sessions.length ; i++){
        this.eventsSession[i] = new EventModel();
        this.eventsSession[i].title = this.sessions[i].description ;
        this.eventsSession[i].startDate = this.sessions[i].plannedDate ;
        this.eventsSession[i].endDate =   this.sessions[i].plannedDate; 
        this.eventsSession[i].link = this.sessions[i]._id;
 


    }
    debugger;


  }

// a supprimer
  sessionExpend(sessionApi : SessionModel){

  	


  	this.sessionExpended = sessionApi;


  	for(var i = 0; i < this.sessionExpended.round.length ; i++){


  		if (this.sessionExpended.round[i].repeat > 0){

  			var xtest=[];

  			for (var z = 0; z < this.sessionExpended.round[i].repeat; z++){


  				for (var j = 0; j < sessionApi.round[i].exercices.length; j++){

  					if (xtest.length >0){
  						xtest.push(sessionApi.round[i].exercices[j]);
  					}
  					else {

  						xtest[0]=sessionApi.round[i].exercices[j];
  					}
  					//	this.sessionExpended.round[i].exercices.push(session.round[i].exercices[j]);


  				}

  			}

  			this.sessionExpended.round[i].exercices = xtest as [ExerciseModel];

  		}

  		



  	}






  }

  previousExercise(event:string){

  	// début de la session

  	if (this.currentExercise.round == 0 && this.currentExercise.exercise == 0 && this.currentExercise.repeat == 1){
  		  		this.stopCountDown();


  		this.toastr.error('First Exercise reached', 'Error!' , {timeOut: 2000});

  	}


  	//debut round

  	else if (this.currentExercise.exercise  == 0 && this.currentExercise.repeat == 1){
  		  		this.stopCountDown();


  		this.currentExercise.drills == false ? (this.currentExercise.drills = true, this.currentExercise.exercise = this.session.round[this.currentExercise.round].exercices.length -1,this.currentExercise.round -=  1, this.currentExercise.repeat = this.session.round[this.currentExercise.round].repeat, this.countdowncomponent.setDuration(this.session.round[this.currentExercise.round].drillsDuration)) : (this.currentExercise.drills = false, this.countdowncomponent.setDuration(this.session.round[this.currentExercise.round].restDuration)) ;



  	}

  	//debut repeat

  	else if (this.currentExercise.exercise  == 0){

  		this.stopCountDown();

  		this.currentExercise.drills == false ? (this.currentExercise.drills = true, this.currentExercise.exercise = this.session.round[this.currentExercise.round].exercices.length -1,this.currentExercise.repeat -=  1, this.countdowncomponent.setDuration(this.session.round[this.currentExercise.round].drillsDuration) ): (this.currentExercise.drills = false, this.countdowncomponent.setDuration(this.session.round[this.currentExercise.round].restDuration));
		

		


  	}

  	else {

  		 this.currentExercise.drills == false ? (this.currentExercise.drills = true,this.currentExercise.exercise -= 1 , this.countdowncomponent.setDuration(this.session.round[this.currentExercise.round].drillsDuration) ): (this.currentExercise.drills = false, this.countdowncomponent.setDuration(this.session.round[this.currentExercise.round].restDuration) );
  		this.stopCountDown();


  		



  	}




  }


  changeDate(date:Date){
    
       this.sessionService.getSessionsByMonth(date.getFullYear(), date.getMonth())
         .subscribe(sessionApi => {
              
              this.sessions = sessionApi;
              this.sessionToEvent();
              this.loaded = true;

      })


  }

  nextExercise(event:string){

    debugger;

//end of the session 
  	if ( this.currentExercise.round == this.session.round.length -1 && this.currentExercise.exercise == this.session.round[this.currentExercise.round].exercices.length-1 && this.currentExercise.repeat == this.session.round[this.currentExercise.round].repeat){

  		this.toastr.success('End of your Workout :'+ this.session.round[this.currentExercise.round].title, 'Finished !' , {timeOut: 2000});
  			if(event== 'manual'){

		        this.finishSession();

	        }

          else {

            this.finishSession()
          }


  	}

 // fin d'un round

  	else if (this.currentExercise.exercise == this.session.round[this.currentExercise.round].exercices.length -1 && this.currentExercise.repeat == this.session.round[this.currentExercise.round].repeat){

  		this.currentExercise.drills ? (this.currentExercise.drills = false, this.currentExercise.repeat=1, this.currentExercise.exercise = 0,this.currentExercise.round +=  1, this.countdowncomponent.setDuration(this.session.round[this.currentExercise.round].restDuration),   		this.toastr.success('End of round :'+ this.session.round[this.currentExercise.round].title, 'Next Round !' , {timeOut: 2000})
) : (this.currentExercise.drills = true, this.countdowncomponent.setDuration(this.session.round[this.currentExercise.round].drillsDuration)) ;

  			if(event== 'manual'){

				this.stopCountDown();

				}
        else if(this.currentExercise.drills){
          this.startCountDown();
        }

        else {

        this.stopRounds();



        }
  	  	

  }

  // fin d'un repeat

  else if (this.currentExercise.exercise == this.session.round[this.currentExercise.round].exercices.length -1){

	this.currentExercise.drills ? (this.currentExercise.drills = false, this.currentExercise.repeat +=1, this.currentExercise.exercise = 0,this.countdowncomponent.setDuration(this.session.round[this.currentExercise.round].drillsDuration), this.toastr.success('End of a repeat :'+ this.session.round[this.currentExercise.round].title, 'Continue !' , {timeOut: 2000})
) : (this.currentExercise.drills = true, this.countdowncomponent.setDuration(this.session.round[this.currentExercise.round].drillsDuration)) ;

	
	if(event== 'manual'){

		this.stopCountDown();

	}
	else {

		this.startCountDown();
	}
	




  }

  else {
  	  		this.currentExercise.drills ? (this.currentExercise.drills = false, this.currentExercise.exercise += 1, this.countdowncomponent.setDuration(this.session.round[this.currentExercise.round].restDuration)) : (this.currentExercise.drills = true, this.countdowncomponent.setDuration(this.session.round[this.currentExercise.round].drillsDuration)) ;

	if(event== 'manual'){

		this.stopCountDown();

	}
	else {

		this.startCountDown();
	}
	


  }



}
}



