import { Component, OnChanges, OnInit, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import User from '../../models/user.model';
import Session from '../../models/session.model';
import {CaloriesBurntService} from '../../services/caloriesBurnt.service';
import {SessionService} from '../../services/session.service';
import CaloriesBurnt from '../../models/caloriesBurnt.model';
import {RangeSimpleQuestion} from '../../dynamic-form/models/question-range-simple.model';
import {QuestionBase} from '../../dynamic-form/models/question-base.model';


@Component({
	selector: 'app-session-end',
	templateUrl: './session-end.component.html',
	styleUrls: ['./session-end.component.scss']
})


export class SessionEndComponent implements OnInit {
	caloriesPerUser : CaloriesBurnt[];
	questionsCalories : RangeSimpleQuestion[]; 
	@Input() users : User[];
	@Input() session : Session;
	@Output() saveCal = new EventEmitter();
	@Output() cancelCal = new EventEmitter();
	update:number= 0;


  	constructor(    
  		private caloriesBurntService: CaloriesBurntService,
  		private sessionService: SessionService,

		) {

  		this.caloriesPerUser = new Array();
  		this.questionsCalories = new Array();

  	 }

	ngOnInit() {
		// for( var j = 0; j < this.users.length; j++){

		// 	this.caloriesPerUser.push({'user':this.users[j], 'cal': 0});
		// }
		this.usersToQuestion();
      	this.sessionService.attendeesAdded.subscribe(x=>{
      		this.update +=1;
      		this.addAttendee(x);
      	}

      	)
	}



	save(value){
	
		this.caloriesPerUser = new Array();

		for ( var v = 0 ; v < this.users.length; v++){

			var cbpu : CaloriesBurnt;
			cbpu = {'_id': '','userId' : this.users[v], 'amount' : value[this.users[v]._id], 'sessionId' : this.session};


			this.caloriesPerUser.push(cbpu);
		}
		this.caloriesBurntService.createCaloriesBurnts(this.caloriesPerUser).subscribe(data =>{
			this.saveCal.emit(data);

		})
	}


	cancel(){
		this.cancelCal.emit(true);

	}

  	usersToQuestion(){


//  	    this.questionsCalories = new QuestionBase();
			this.questionsCalories = new Array();
	  	    for (var v = 0; v < this.users.length; v++){
	  	    		this.questionsCalories.push(new RangeSimpleQuestion({
								            key: this.users[v]._id,
								            label: this.users[v].name,
								            value: 0,
								            options: {min : 200, max: 800, step:1}, 
								            required: true,
								            order: v +1,

	  	    		}) )

  		}
  		return this.questionsCalories 

	}

	addAttendee(attendee:User[]){
		debugger;
		console.log('on est dans le addAttendee du  seesion end component')
		const v = this.users.length ;
		attendee.map(x=>	  	    		
			this.questionsCalories.push(new RangeSimpleQuestion({
			            key: x._id,
			            label: x.name,
			            value: 0,
			            options: {min : 200, max: 800, step:1}, 
			            required: true,
			            order: v +1,

	  	    		}) 
			))
		//attendee.map(x=> this.users.push(x));
	}
}