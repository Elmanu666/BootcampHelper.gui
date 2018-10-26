import { Component, OnInit, ViewContainerRef, ViewChild } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import Session from '../../models/session.model';
import Round from '../../models/round.model';
import { ToastrService } from 'ngx-toastr';
import { SessionDisplayComponent } from '../session-display/session-display.component';
import { Router, ActivatedRoute } from '@angular/router';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  query,
  stagger,
} from '@angular/animations';



import { ExerciseService } from '../../services/exercise.service';
import { SessionService } from '../../services/session.service';
import Exercise from '../../models/exercise.model';

function remove(item: string, list: string[]) {
  if (list.indexOf(item) !== -1) {
    list.splice(list.indexOf(item), 1);
  }
}

@Component({
  selector: 'app-root',
  templateUrl: './session-create.component.html',
  styleUrls: ['./session-create.component.scss'],
  animations: [
        trigger('cardBody', [
          transition('void => *',[ 
              style({  height: '0'  }),
              animate(500, style({ height: '100%'}  ))
            ]),
          transition('* => void', [
              animate(500, style({  height: '0'  }))
            ])
          ])

        ],
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
  dropAreaClass : string;
  activAccordion:number;

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

   this.activAccordion = 0;
   this.id = this.route.snapshot.paramMap.get('id') ? this.route.snapshot.paramMap.get('id') : "create";

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
        this.loaded = true;
      })
    }
     this.exerciseService.getExercises(1)
      .subscribe(exercises => {
        //assign the todolist property to the proper http response
        this.exercisesList = exercises;
      //  this.pagesInfo = this.pagerService.getPager();
      })
    
  }


  copySession(){
    this.id = "create";
    this.newSession._id = "";
    this.newSession.plannedDate = new Date();
    this.newSession.executionDate = null;
    this.toastr.success('Copy succesful : don t forget to save', 'Success!' , {timeOut: 2000});
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

  deleteExerciseSelected(idRound:number, idExercise:number, type:string, exAltId :number){
    
    if (type=='main'){
     var tmp = this.newSession.round[idRound].exercices.filter(exr=>{
        return !(exr ==this.newSession.round[idRound].exercices[idExercise]); 


      })

      this.newSession.round[idRound].exercices = tmp;

    }

    else if (type=='alt'){
     var tmp = this.newSession.round[idRound].exercisesAlternatives[exAltId].exercises.filter(exr=>{
        return !(exr ==this.newSession.round[idRound].exercisesAlternatives[exAltId].exercises[idExercise]); 


      })

      this.newSession.round[idRound].exercisesAlternatives[exAltId] = tmp;

    }
  }

  sort(event: SortEvent, roundId:number, type:string, excAltId:number) {
   
   if(type ==='main'){
    const current = this.newSession.round[roundId].exercices[event.currentIndex];
    const swapWith = this.newSession.round[roundId].exercices[event.newIndex];

    this.newSession.round[roundId].exercices[event.newIndex] = current;
    this.newSession.round[roundId].exercices[event.currentIndex] = swapWith;
   } 

   else if(type==='alt'){
    const current = this.newSession.round[roundId].exercisesAlternatives[excAltId].exercises[event.currentIndex];
    const swapWith = this.newSession.round[roundId].exercisesAlternatives[excAltId].exercises[event.newIndex];

    this.newSession.round[roundId].exercisesAlternatives[excAltId].exercises[event.newIndex] = current;
    this.newSession.round[roundId].exercisesAlternatives[excAltId].exercises[event.currentIndex] = swapWith;

   }
  }

  updateExercisesNumber(id){

    	var i = this.newSession.round[id]['exercices'].length;
    	if(this.newSession.round[id]['exercices'].length < this.newSession.round[id].exercisesNumber){
    		for (var v=0; v < this.newSession.round[id].exercisesNumber- i; v++){
  				this.newSession.round[id]['exercices'].push(new Exercise());         
    		}
    	}

    	if (this.newSession.round[id]['exercices'].length > this.newSession.round[id].exercisesNumber){
    		for (var v=0; v < this.newSession.round[id].exercisesNumber- i; v++){
				this.newSession.round[id]['exercices'].pop();
    		}
    	}

      this.updateExercisesAlternativesNumber(id);
  }

  updateExercisesAlternativesNumber(id:number){
    if (typeof this.newSession.round[id].exercisesAlternatives != undefined && this.newSession.round[id].exercisesAlternatives.length > 0){
        for (var i = 0; i < this.newSession.round[id].exercisesAlternatives.length ; i++){
          if (this.newSession.round[id].exercisesAlternatives[i].exercises.length < this.newSession.round[id].exercisesNumber){
           this.newSession.round[id].exercisesAlternatives[i].exercises.push(new Exercise());           
          }
          else if (this.newSession.round[id].exercisesAlternatives[i].exercises.length < this.newSession.round[id].exercisesNumber){
            this.newSession.round[id].exercisesAlternatives[i].exercises.pop();
          }
        }
    }
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
    if (this.id == 'create'){
      this.sessionService.createSession(this.newSession).subscribe(res =>
        {
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


  dragOver(event :any){
    event.preventDefault();
    event.stopPropagation();

    this.dropAreaClass = 'dropOver';
  }

  dragLeave(event : any){
    event.preventDefault();
    event.stopPropagation();

    this.dropAreaClass = 'dropOut';
  }

  drop(event: any, id : number, type: string, idAtl : number){
    event.preventDefault();
    event.stopPropagation();
    
    if(type == 'main'){
      for (var i = 0 ; i < this.exercisesList.length; i++){

        this.exercisesList[i]._id == event.dataTransfer.getData("_id") ?   ( this.newSession.round[id].exercices.length < 1 ? this.newSession.round[id].exercices[0] = this.exercisesList[i] :  this.newSession.round[id].exercisesNumber > this.newSession.round[id].exercices.length ? this.newSession.round[id].exercices.push(this.exercisesList[i]) : this.newSession.round[id].exercices[this.newSession.round[id].exercices.length-1] = this.exercisesList[i]):'';
      }

    }
    else if(type=='alt'){
       for (var i = 0 ; i < this.exercisesList.length; i++){
              this.exercisesList[i]._id == event.dataTransfer.getData("_id") ?   ( this.newSession.round[id].exercisesAlternatives[idAtl].exercises.length < 1 ? this.newSession.round[id].exercisesAlternatives[idAtl].exercises[0] = this.exercisesList[i] :  this.newSession.round[id].exercisesNumber > this.newSession.round[id].exercisesAlternatives[idAtl].exercises.length ? this.newSession.round[id].exercisesAlternatives[idAtl].exercises.push(this.exercisesList[i]) : this.newSession.round[id].exercisesAlternatives[idAtl].exercises[this.newSession.round[id].exercisesAlternatives.length-1] = this.exercisesList[i]):'';
         }

    }


    this.dropAreaClass = 'dropOut';
  }

  drag(event : any){
    event.preventDefault();

    console.log(event);
  }

  dragExercise(event : any, id :Exercise['_id']){

    
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData("_id", id); 
    event.target.classList.add('active'); 
  }

  dropExercise(){

    
    event.target.classList.remove('active'); 
  }


  roundChange(id){


    this.activAccordion == id ? this.activAccordion = null : this.activAccordion = id;
  }

// add alternative exercises to the round specified : max alternative : nb of attendees
  addAlternative(id){
    // typeof this.newSession.round[id].exercisesAlternatives =='undefined' ? this.newSession.round[id].exercisesAlternatives = new Array() :"";
    // typeof this.newSession.round[id].exercisesAlternativesUsers =='undefined' ? this.newSession.round[id].exercisesAlternativesUsers = new Array() :"";
    typeof this.newSession.round[id].exercisesAlternatives =='undefined' ? this.newSession.round[id].exercisesAlternatives = new Array() :"";
    this.newSession.round[id].exercisesAlternatives.length >= this.newSession.attendees.length-1 ? this.toastr.warning('Max exercises alternatives per round reached' , {timeOut: 2000}) : this.addAlternativeToRound(id); 
  }

  addAlternativeToRound(id){
    if (this.newSession.round[id].exercisesAlternatives.length==0){
        this.newSession.round[id].exercisesAlternatives[0] = new Array();
        this.newSession.round[id].exercisesAlternatives[0] = { 'users' : new Array(), 'exercises' : new Array()};
        this.newSession.round[id].exercices.map(exc =>
            {
              this.newSession.round[id].exercisesAlternatives[0].exercises.push(exc);
            })
    }
    else {
      var lt = this.newSession.round[id].exercisesAlternatives.length;
      this.newSession.round[id].exercisesAlternatives[lt] = new Array();
      this.newSession.round[id].exercisesAlternatives[lt] = { 'users' : new Array(), 'exercises' : new Array()};
      this.newSession.round[id].exercices.map(exc =>  {
            this.newSession.round[id].exercisesAlternatives[lt].exercises.push(exc);
          })
    }
  }


  deleteExercisesAlternatives(roundId:number,excAAltId:number){
    if (this.newSession.round[roundId].exercisesAlternatives.length==1){
      this.newSession.round[roundId].exercisesAlternatives = new Array();
      this.newSession.round[roundId].exercicesMainUser = new Array();
    }
    else {
      var t = this.newSession.round[roundId].exercisesAlternatives.filter(exc=>{
       !(exc.exercises == this.newSession.round[roundId].exercisesAlternatives[excAAltId].exercises);
      });
      this.newSession.round[roundId].exercisesAlternatives = t ;
      this.defineMainExerciseUser()
    }
  }

  altUserSelection(event:any, refNum: {'round': number, 'exrAlt': number}){
    var usr = this.newSession.attendees.filter(attendee=>{
      return !event.value.includes(attendee);
    })
    this.newSession.round[refNum.round].exercisesMainUser = new Array();
    this.newSession.round[refNum.round].exercisesMainUser = usr;
  }

  defineMainExerciseUser(roundId: number){
    if(this.newSession.round[roundId].exercisesAlternatives.length > 0){
      var att = this.newSession.attendees.filter(attendee=>{
        return !(this.newSession.round[roundId].exercisesAlternatives.map(exrcAlt=>{
          exrcAlt.users.includes(attendee)
        }))
      this.newSession.round[roundId].exercisesMainUser = att;  
      })
    }
  }

}









    


