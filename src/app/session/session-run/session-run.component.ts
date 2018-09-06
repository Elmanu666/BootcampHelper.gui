import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import SessionModel from '../../models/session.model';
import ExerciseModel from '../../models/exercise.model';
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
  		animate(1000)

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


	startSession(){
		this.started=true;
		setTimeout(()=>{this.initRound()}, 500 ) ;


	  }

	initRound(){

		this.countdowncomponent.durationSelected={"hour":0, "minute":0, "second":5, "msecond" : 0};

	}




	startRounds(){
		this.roundsStarted = true;
		this.startCountDown();
	//	this.countdowncomponent.startCountDown();
	
	}


	pauseRounds(){
		this.roundsStarted = false;
		this.countdowncomponent.pauseCountDown();

	}

	stopRounds(){
		this.roundsStarted = false;
		this.countdowncomponent.stopCountDown();



	}

	startCountDown(){

		this.countdowncomponent.startCountDown();


	}

	stopCountDown(){

		this.countdowncomponent.stopCountDown();


	}

	errors: Array<string> =[];
	session: SessionModel  ;
	sessionExpended : SessionModel;
  	loaded : boolean = false;
  	idSession : SessionModel['_id'];
  	currentExercise : {'round':number, 'exercise':number, 'drills':boolean, 'repeat':number};
  	started:boolean;
  	roundsStarted :boolean=false;
  	progressBar:boolean=true;





  constructor(
  		private route: ActivatedRoute,
  		private sessionService: SessionService,
  		public toastr: ToastrService,



  	) { }

  ngOnInit() {
  	this.progressBar = true;
  	this.currentExercise = {'round':0, 'exercise':0, 'drills':false, 'repeat':1};
  	this.started=false;

  	console.log('on est dans session run')

  		this.idSession = this.route.snapshot.paramMap.get('id');

  		this.sessionService.getSession(this.idSession)
      			.subscribe(sessionApi => {
      				console.log('on reçoit la session')
        			//assign the todolist property to the proper http response
        			this.session = sessionApi;
        			console.log(this.session);

 //       			this.sessionExpend(sessionApi);
        		//	this.sessionExpended = sessionApi;
        			this.loaded = true





      })



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
  	console.log(xtest)






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


  		this.currentExercise.drills == false ? (this.currentExercise.drills = true, this.currentExercise.exercise = this.session.round[this.currentExercise.round].exercices.length -1,this.currentExercise.round -=  1, this.currentExercise.repeat = this.session.round[this.currentExercise.round].repeat, this.countdowncomponent.durationSelected={"hour":0, "minute":0, "second":30, "msecond" : 0}) : (this.currentExercise.drills = false, this.countdowncomponent.durationSelected={"hour":0, "minute":0, "second":5, "msecond" : 0}) ;



  	}

  	//debut repeat

  	else if (this.currentExercise.exercise  == 0){

  		this.stopCountDown();

  		this.currentExercise.drills == false ? (this.currentExercise.drills = true, this.currentExercise.exercise = this.session.round[this.currentExercise.round].exercices.length -1,this.currentExercise.repeat -=  1, this.countdowncomponent.durationSelected={"hour":0, "minute":0, "second":30, "msecond" : 0}) : (this.currentExercise.drills = false, this.countdowncomponent.durationSelected={"hour":0, "minute":0, "second":5, "msecond" : 0}) ;
		

		


  	}

  	else {

  		 this.currentExercise.drills == false ? (this.currentExercise.drills = true,this.currentExercise.exercise -= 1 , this.countdowncomponent.durationSelected={"hour":0, "minute":0, "second":30, "msecond" : 0}) : (this.currentExercise.drills = false, this.countdowncomponent.durationSelected={"hour":0, "minute":0, "second":5, "msecond" : 0}) ;
  		this.stopCountDown();


  		



  	}




  }

  nextExercise(event:string){

//end of the session 
  	if ( this.currentExercise.round == this.session.round.length -1 && this.currentExercise.exercise == this.session.round[this.currentExercise.round].exercices.length-1 && this.currentExercise.repeat == this.session.round[this.currentExercise.round].repeat){

  		this.toastr.success('End of your Workout :'+ this.session.round[this.currentExercise.round].title, 'Finished !' , {timeOut: 2000});
  			if(event== 'manual'){

		this.stopCountDown();

	}


  	}

 // fin d'un round

  	else if (this.currentExercise.exercise == this.session.round[this.currentExercise.round].exercices.length -1 && this.currentExercise.repeat == this.session.round[this.currentExercise.round].repeat){

  		this.currentExercise.drills ? (this.currentExercise.drills = false, this.currentExercise.repeat=1, this.currentExercise.exercise = 0,this.currentExercise.round +=  1, this.countdowncomponent.durationSelected={"hour":0, "minute":0, "second":5, "msecond" : 0},   		this.toastr.success('End of round :'+ this.session.round[this.currentExercise.round].title, 'Next Round !' , {timeOut: 2000})
) : (this.currentExercise.drills = true, this.countdowncomponent.durationSelected={"hour":0, "minute":0, "second":30, "msecond" : 0}) ;

  			if(event== 'manual'){

				this.stopCountDown();

				}
  	  	

  }

  // fin d'un repeat

  else if (this.currentExercise.exercise == this.session.round[this.currentExercise.round].exercices.length -1){

	this.currentExercise.drills ? (this.currentExercise.drills = false, this.currentExercise.repeat +=1, this.currentExercise.exercise = 0,this.countdowncomponent.durationSelected={"hour":0, "minute":0, "second":5, "msecond" : 0},   		this.toastr.success('End of a repeat :'+ this.session.round[this.currentExercise.round].title, 'Continue !' , {timeOut: 2000})
) : (this.currentExercise.drills = true, this.countdowncomponent.durationSelected={"hour":0, "minute":0, "second":30, "msecond" : 0}) ;

	
	if(event== 'manual'){

		this.stopCountDown();

	}
	else {

		this.startCountDown();
	}
	




  }

  else {
  	  		this.currentExercise.drills ? (this.currentExercise.drills = false, this.currentExercise.exercise += 1, this.countdowncomponent.durationSelected={"hour":0, "minute":0, "second":5, "msecond" : 0}) : (this.currentExercise.drills = true, this.countdowncomponent.durationSelected={"hour":0, "minute":0, "second":30, "msecond" : 0}) ;

	if(event== 'manual'){

		this.stopCountDown();

	}
	else {

		this.startCountDown();
	}
	


  }



}
}



