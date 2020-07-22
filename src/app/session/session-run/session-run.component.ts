import { Component, OnInit, ViewChild, ChangeDetectionStrategy, TemplateRef} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import SessionModel from '../../models/session.model';
import ExerciseModel from '../../models/exercise.model';
import EventModel from '../../calendar/calendar.model';
import User from '../../models/user.model';
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
import { CalendarComponent } from '../../calendar/calendar.component';
import { SessionUsersSelectionComponent } from '../session-users-selection/session-users-selection.component';
import { NgxSpinnerService } from 'ngx-spinner';





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
  NextExercise : {'round':number, 'exercise':number, 'drills':boolean, 'repeat':number};
	started:boolean;
	roundsStarted :boolean=false;
  roundsPaused :boolean=false;
  sessionFinished : boolean =false;
  SessionResume : boolean=false;
	progressBar:boolean=true;
  mainDisplay: string;
  audio= new Audio();

   







  constructor
    (
  		private route: ActivatedRoute,
  		private sessionService: SessionService,
  		public toastr: ToastrService,
      private spinner: NgxSpinnerService,


  	) 
    {}

  ngOnInit() {
    this.initAudio();

    this.route.snapshot.paramMap.get('id') != null ? (this.calendar = false , this.idSession = this.route.snapshot.paramMap.get('id'), this.loaded=false):  (this.calendar =true);
  	this.progressBar = true;
    this.currentExercise = {'round':0, 'exercise':0, 'drills':false, 'repeat':1};
  	this.NextExercise = {'round':0, 'exercise':1, 'drills':false, 'repeat':1};
  	this.started=false;

    if(!this.calendar){      
        this.spinner.show();
        this.sessionService.getSession(this.idSession)
            .subscribe(sessionApi => {
             
              this.session = sessionApi;
              this.sessionService.setAsProcessingSesssion(this.session);
                  setTimeout(() => {
                    this.loaded = true;
                    this.spinner.hide();
                    }, 200);
      })

     }

     else {
       this.spinner.show();
       var dd = new Date();

       var y = dd.getFullYear();
       var m = dd.getMonth();

       this.sessionService.getSessionsByMonth(y, m)
         .subscribe(sessionApi => {
              
              this.sessions = sessionApi;
              this.sessionToEvent();
              setTimeout(() => {
                this.loaded = true;
                this.spinner.hide();
                }, 200);


      })

     }


  }


    startSession(){
    this.session.round[0].exercisesId.length > 1 ? this.NextExercise.exercise =1 : this.NextExercise.exercise =999;
    this.started=true;
    this.session.executionStart = new Date();


    }



  initRound(){
    this.roundsStarted = false;

  //  this.countdowncomponent.setDuration(this.session.round[0].restDuration);
  }




  startRounds(){
    if(!this.roundsPaused){
      this.roundsStarted = true;
      this.playAudio();
      setTimeout(()=>{
     
          this.countdowncomponent.setDuration(this.session.round[this.currentExercise.round].restDuration);

          setTimeout(()=>{

                      this.startCountDown();


          }, 5);
       }, 5);

    }
    else if(this.roundsPaused){
      this.roundsPaused = false;
      this.countdowncomponent.startCountDown();

    }


  //  this.countdowncomponent.startCountDown();
  
  }

  continueRounds(){

    this.roundsStarted = true;
    this.countdowncomponent.startCountDown();


  }


  pauseRounds(){
    debugger;
    this.countdowncomponent.pauseCountDown();
    this.roundsStarted = true;
    this.roundsPaused = true;


  }

  stopRounds(){
    this.countdowncomponent.stopCountDown();
    this.roundsStarted = false;



  }


  skipRounds(){
   console.log('skipRounds');
    this.nextRound()
  }

  nextRound(){

    if ( this.currentExercise.round == this.session.round.length -1){
      this.finishSession();

    }

    else
    {
      this.currentExercise.drills = false;
      this.currentExercise.repeat=1;
      this.currentExercise.exercise = 0;
      this.currentExercise.round +=  1;
      this.countdowncomponent.setDuration(this.session.round[this.currentExercise.round].restDuration);
    }


  }




  startCountDown(){
    this.playAudio();
   
    this.countdowncomponent.startCountDown();


  }

  stopCountDown(){

    this.countdowncomponent.stopCountDown();


  }



  finishSession(){
    this.session.executionEnd = new Date();
    this.countdowncomponent.stopCountDown();
    this.started=false;
    this.roundsStarted = false;
    this.sessionFinished=true;




  }

  endSession(){
    this.SessionResume=true;
    this.session.executed = true;
    this.session.Status = 'done';
    this.sessionService.editSession(this.session).subscribe(res => {
          console.log('Update Succesful')


        }, err => {

          this.toastr.error('Update Unsuccesful', 'Error!' , {timeOut: 2000});
        })

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
        this.sessions[i].Status == 'new' ? this.eventsSession[i].primaryColor = 'green' : (this.sessions[i].Status == 'done' ? this.eventsSession[i].primaryColor = 'blue' : this.eventsSession[i].primaryColor = 'red' );
 


    }
  


  }

// a supprimer
  sessionExpend(sessionApi : SessionModel){

  	


  	this.sessionExpended = sessionApi;


  	for(var i = 0; i < this.sessionExpended.round.length ; i++){


  		if (this.sessionExpended.round[i].repeat > 0){

  			var xtest=[];

  			for (var z = 0; z < this.sessionExpended.round[i].repeat; z++){


  				for (var j = 0; j < sessionApi.round[i].exercisesId.length; j++){

  					if (xtest.length >0){
  						xtest.push(sessionApi.round[i].exercisesId[j]);
  					}
  					else {

  						xtest[0]=sessionApi.round[i].exercisesId[j];
  					}
  					//	this.sessionExpended.round[i].exercises.push(session.round[i].exercises[j]);


  				}

  			}

  			this.sessionExpended.round[i].exercisesId = xtest as [ExerciseModel];

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


  		this.currentExercise.drills == false ? (this.currentExercise.drills = true, this.currentExercise.exercise = this.session.round[this.currentExercise.round].exercisesId.length -1,this.currentExercise.round -=  1, this.currentExercise.repeat = this.session.round[this.currentExercise.round].repeat, this.countdowncomponent.setDuration(this.session.round[this.currentExercise.round].drillsDuration)) : (this.currentExercise.drills = false, this.countdowncomponent.setDuration(this.session.round[this.currentExercise.round].restDuration)) ;



  	}

  	//debut repeat

  	else if (this.currentExercise.exercise  == 0){

  		this.stopCountDown();

  		this.currentExercise.drills == false ? (this.currentExercise.drills = true, this.currentExercise.exercise = this.session.round[this.currentExercise.round].exercisesId.length -1,this.currentExercise.repeat -=  1, this.countdowncomponent.setDuration(this.session.round[this.currentExercise.round].drillsDuration) ): (this.currentExercise.drills = false, this.countdowncomponent.setDuration(this.session.round[this.currentExercise.round].restDuration));
		

		


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
//end of the session 
  	if ( this.currentExercise.round == this.session.round.length -1 && this.currentExercise.exercise == this.session.round[this.currentExercise.round].exercisesId.length-1 && this.currentExercise.repeat == this.session.round[this.currentExercise.round].repeat){
      if(this.currentExercise.drills == true){
        this.toastr.success('End of your Workout :'+ this.session.round[this.currentExercise.round].title, 'Finished !' , {timeOut: 2000});
        if(event== 'manual'){
            this.finishSession();
          }

          else {
            this.playAudio();
            this.finishSession();
          }

      }
      else {

        this.currentExercise.drills = true;
        this.countdowncomponent.setDuration(this.session.round[this.currentExercise.round].drillsDuration);
        this.startCountDown();
      }


  	}

 // fin d'un round

  	else if (this.currentExercise.exercise == this.session.round[this.currentExercise.round].exercisesId.length -1 && this.currentExercise.repeat == this.session.round[this.currentExercise.round].repeat){

  		this.currentExercise.drills ? (this.currentExercise.drills = false, this.currentExercise.repeat=1, this.currentExercise.exercise = 0,this.currentExercise.round +=  1, this.countdowncomponent.setDuration(this.session.round[this.currentExercise.round].restDuration),   		this.toastr.success('End of round :'+ this.session.round[this.currentExercise.round].title, 'Next Round !' , {timeOut: 2000})
) : (this.currentExercise.drills = true, this.countdowncomponent.setDuration(this.session.round[this.currentExercise.round].drillsDuration), this.NextExercise.exercise = 999) ;

  			if(event== 'manual'){

				this.stopCountDown();

				}
        else if(this.currentExercise.drills){
          this.startCountDown();
        }

        else {

        this.stopRounds();
        this.playAudio();



        }
  	  	return ;

  }

  // fin d'un repeat

  else if (this.currentExercise.exercise == this.session.round[this.currentExercise.round].exercisesId.length -1){

    	this.currentExercise.drills ? (this.currentExercise.drills = false, this.currentExercise.repeat +=1, this.currentExercise.exercise = 0,this.countdowncomponent.setDuration(this.session.round[this.currentExercise.round].restDuration), this.toastr.success('End of a repeat :'+ this.session.round[this.currentExercise.round].title, 'Continue !' , {timeOut: 2000}), this.NextExercise.exercise = 1
    ) : (this.currentExercise.drills = true, this.countdowncomponent.setDuration(this.session.round[this.currentExercise.round].drillsDuration), this.NextExercise.exercise=0) ;

      // this.NextExercise = Object.assign({}, this.currentExercise);
      // this.NextExercise.exercise = this.currentExercise.exercise + 1;
    	
    	if(event== 'manual'){

    		this.stopCountDown();

    	}
    	else {
    //    this.playAudio();
    		this.startCountDown();
    	}
    	

     return;


  }

  else {
    	this.currentExercise.drills ? (this.currentExercise.drills = false, this.currentExercise.exercise += 1, this.countdowncomponent.setDuration(this.session.round[this.currentExercise.round].restDuration)) : (this.currentExercise.drills = true, this.countdowncomponent.setDuration(this.session.round[this.currentExercise.round].drillsDuration)) ;

      this.NextExercise = Object.assign({}, this.currentExercise);

      this.NextExercise.exercise == this.session.round[this.currentExercise.round].exercisesId.length -1 ? this.session.round[this.currentExercise.round].repeat == this.currentExercise.repeat ?this.NextExercise.exercise = 999 : this.NextExercise.exercise = 0 : this.NextExercise.exercise  += 1;


    	if(event== 'manual'){

    		this.stopCountDown();

    	}
    	else {
  //      this.playAudio();
    		this.startCountDown();
    	}
    	


    }



  }

  initAudio(){

    this.audio.src = "../../../../assets/audio/pagerbeeps.mov";
    this.audio.load();

  }

  playAudio(){

    this.audio.play();
  }

  setCalories(value:any){
   
    var data = value.data.map(x => {
      return x._id
    })
    this.session.caloriesBurntId = data;

    this.endSession();


  }

  addAttendees(user:any){

    console.log(this.sessionService.ProcessingSession.attendees);




  }


}



