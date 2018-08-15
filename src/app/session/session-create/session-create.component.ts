import { Component, OnInit, ViewContainerRef, ViewChild } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import Session from '../../models/session.model';
import Round from '../../models/round.model';
import { ToastrService } from 'ngx-toastr';
import { SessionDisplayComponent } from '../session-display/session-display.component';
import { Router, ActivatedRoute } from '@angular/router';


import { ExerciseService } from '../../services/exercise.service';
import { SessionService } from '../../services/session.service';
import Exercise from '../../models/exercise.model';


@Component({
  selector: 'app-root',
  templateUrl: './session-create.component.html',
  styleUrls: ['./session-create.component.scss']
})
export class SessionCreateComponent implements OnInit {

  @ViewChild('stepper') stepper;

	isLinear = false;
	users = ['Manu', 'Charly'];
	roundNb = 1;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  public newSession: Session;
  exercisesList: Exercise[];
  loaded: boolean = false;

  constructor(
    private _formBuilder: FormBuilder,
    public toastr: ToastrService, vcr: ViewContainerRef,
    private exerciseService: ExerciseService,
    private sessionService: SessionService,
      private router: Router,

          private route: ActivatedRoute,



   ) { }

  id : string;

  ngOnInit() {

  	console.log(this.users);
  	console.log(this.exercisesList);



   this.id = this.route.snapshot.paramMap.get('id') ? this.route.snapshot.paramMap.get('id') : "create";

    console.log(this.id);

    if (this.id === "create") {

          this.newSession = new Session();
          this.loaded=true;


    }
    else {

       this.sessionService.getSession(this.id)
      .subscribe(session => {
        //assign the todolist property to the proper http response
        this.newSession = session;
        //this.loaded = true
        console.log("on reçoit la session");
        console.log(session);

        this.loaded = true;

      })



    }



     this.exerciseService.getExercises(1)
      .subscribe(exercises => {
        //assign the todolist property to the proper http response
        this.exercisesList = exercises;
      //  this.pagesInfo = this.pagerService.getPager();



      })

    
    console.log(this.newSession);
  }


  updatedRoundsNumber(){
  	if (this.roundNb > this.newSession.round.length){
  		var i = this.newSession.round.length ;




  		for(var v=0; v < this.roundNb - i; v++){

  			this.addRound();

  		}


  	}


  	if (this.roundNb < this.newSession.round.length){

  		var i = this.newSession.round.length ;




  		for(var v=0; v < i - this.roundNb ; v++){

  			this.removeRound();

  		}



  	}


  	


  }

    updateExercisesNumber(id){


    	console.log("updateExercisesNumber :"+id);
      console.log(this.newSession.round[id]['exercices'].length);
      console.log(this.newSession.round[id].exercisesNumber);

    	var i = this.newSession.round[id]['exercices'].length;



    	if(this.newSession.round[id]['exercices'].length < this.newSession.round[id].exercisesNumber){

    		console.log('dans le 1er if')

    		for (var v=0; v < this.newSession.round[id].exercisesNumber- i; v++){


				this.newSession.round[id]['exercices'].push(new Exercise());

    		}



    	}

    	if (this.newSession.round[id]['exercices'].length > this.newSession.round[id].exercisesNumber){

        console.log('dans le 2eme ');

    		for (var v=0; v < this.newSession.round[i].exercisesNumber- i; v++){


				this.newSession.round[id]['exercices'].pop();

    		}



    	}


    	console.log(this.newSession.round[id])
  		
  	}


    removeRound(){

        this.newSession.round.pop();





    }


    addRound(){

      
      var newRound =  new Round();
     
        // roundtype[0]['title']="A modifier";
        // roundtype[0]['exercisesNumber'] = 0;
        // roundtype[0]['drillsDuration'] = 0;
        // roundtype[0]['restDuration'] = 0;
        // roundtype[0]['repeat']=0;
        // roundtype[0]['exercices']=[""];



        this.newSession.round.push(newRound);    



    }

    sessionSave(){


      console.log('on est dans le submitSession')

      if (this.id == 'create'){

          this.sessionService.createSession(this.newSession).subscribe(res =>{
            this.toastr.success('Creation succesful', 'Success!' , {timeOut: 2000});
            this.stepper.reset();
            this.newSession = new Session();
            this.roundNb = 1 ;
                 },err => {

                console.error('error creation')

            })
         }


         else {



           

       this.sessionService.editSession(this.newSession).subscribe(res => {
          console.log('Update Succesful')
          this.toastr.success('Update succesful', 'Success!' , {timeOut: 2000});
          this.router.navigate(['session/list/']);

        }, err => {

          this.toastr.error('Update Unsuccesful', 'Error!' , {timeOut: 2000});
        })




         }
  
      }





    


}
