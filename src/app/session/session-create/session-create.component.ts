import { Component, OnInit, ViewContainerRef, ViewChild } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { trigger, state, style, animate, transition, query, stagger } from '@angular/animations';
import { Router, ActivatedRoute } from '@angular/router';
import {CdkDragDrop, moveItemInArray, transferArrayItem, copyArrayItem} from '@angular/cdk/drag-drop';



import { MatTooltipModule } from '@angular/material';



import { ToastrService } from 'ngx-toastr';
import { SessionDisplayComponent } from '../session-display/session-display.component';
import { DatePipe } from '@angular/common';




import { UserService } from '../../services/user.service';
import { ExerciseService } from '../../services/exercise.service';
import { SessionService } from '../../services/session.service';


import Session from '../../models/session.model';
import Round from '../../models/round.model';
import User from '../../models/user.model';
import Exercise from '../../models/exercise.model';
import { NgxSpinnerService } from 'ngx-spinner';

import { bchTooltipComponent } from '../../tooltip/bch-tooltip.component';
import { bchTooltipDirective } from '../../tooltip/bch-tooltip.directive';


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





	isLinear:boolean = false;
	users : any[];
	roundNb :number = 1;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  newSession: Session;
  exercisesList: Exercise[];
  exercisesListFiltered: Exercise[];
  loaded: boolean = false;
  dropAreaClass : string;
  activAccordion:number;
  filter:{'any':boolean, 'cardio': boolean, 'muscu': boolean, 'balance': boolean, 'warmup':boolean} ;

  @ViewChild('stepper') stepper;

  constructor(
    private _formBuilder: FormBuilder,
    public toastr: ToastrService, vcr: ViewContainerRef,
    private exerciseService: ExerciseService,
    private sessionService: SessionService,
    private router: Router,
    private route: ActivatedRoute,
    private userService :UserService,
    private spinner: NgxSpinnerService

   ) { }

  id : string;

  ngOnInit() {
    debugger;
    this.filter = {'any':true, 'cardio': false, 'muscu': false, 'balance': false, 'warmup':false}
    this.userService.getUsers()
      .subscribe(users =>{
        this.users = users;


      })

   this.activAccordion = 0;
   this.route.snapshot.paramMap.get('id') ? this.id = this.route.snapshot.paramMap.get('id') : this.id= "create";

    if (this.id === "create") {

          this.newSession = new Session();
          this.loaded=true;


    }
    else {
      this.spinner.show();
      this.sessionService.getSession(this.id)
     

        .subscribe(session => {
          //assign the todolist property to the proper http response
          this.newSession = session;
          //this.loaded = true
          this.loaded = true;
          this.roundNb = this.newSession.round.length;
          this.spinner.hide();

          debugger;

        })
    }
     this.exerciseService.getExercises(1)
      .subscribe(exercises => {
        //assign the todolist property to the proper http response
        exercises.sort((a,b) => {
          a.title.localeCompare(b.title)
        });
        exercises.sort((a,b) => a['title'].localeCompare(b['title']))
        this.exercisesList = exercises;
        this.exercisesListFiltered = exercises;
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
     var tmp = this.newSession.round[idRound].exercisesId.filter(exr=>{
        return !(exr ==this.newSession.round[idRound].exercisesId[idExercise]); 


      })

      this.newSession.round[idRound].exercisesId = tmp;
      this.newSession.round[idRound].exercisesId.length < this.newSession.round[idRound].exercisesNumber ? this.newSession.round[idRound].exercisesId.push(new Exercise()): '';

    }

    else if (type=='alt'){
     var tmp = this.newSession.round[idRound].exercisesAlternatives[exAltId].exercisesAltId.filter(exr=>{
        return !(exr ==this.newSession.round[idRound].exercisesAlternatives[exAltId].exercisesAltId[idExercise]); 


      })

      this.newSession.round[idRound].exercisesAlternatives[exAltId].exercisesAltId = tmp;
      this.newSession.round[idRound].exercisesAlternatives[exAltId].exercisesAltId.length < this.newSession.round[idRound].exercisesNumber ? this.newSession.round[idRound].exercisesAlternatives[exAltId].exercisesAltId.push(new Exercise()):'';

    }
  }

  sort(event: any, roundId:number, type:string, excAltId:number) {
   
   if(type ==='main'){
    const current = this.newSession.round[roundId].exercisesId[event.currentIndex];
    const swapWith = this.newSession.round[roundId].exercisesId[event.newIndex];

    this.newSession.round[roundId].exercisesId[event.newIndex] = current;
    this.newSession.round[roundId].exercisesId[event.currentIndex] = swapWith;
   } 

   else if(type==='alt'){
    const current = this.newSession.round[roundId].exercisesAlternatives[excAltId].exercisesAltId[event.currentIndex];
    const swapWith = this.newSession.round[roundId].exercisesAlternatives[excAltId].exercisesAltId[event.newIndex];

    this.newSession.round[roundId].exercisesAlternatives[excAltId].exercisesAltId[event.newIndex] = current;
    this.newSession.round[roundId].exercisesAlternatives[excAltId].exercisesAltId[event.currentIndex] = swapWith;

   }
  }

  updateExercisesNumber(id){

    	var i = this.newSession.round[id]['exercisesId'].length;
    	if(this.newSession.round[id]['exercisesId'].length < this.newSession.round[id].exercisesNumber){
    		for (var v=0; v < this.newSession.round[id].exercisesNumber- i; v++){
  				this.newSession.round[id]['exercisesId'].push(new Exercise());         
    		}
    	}

    	if (this.newSession.round[id]['exercisesId'].length > this.newSession.round[id].exercisesNumber){
    		for (var v=0; v < this.newSession.round[id].exercisesNumber- i; v++){
				this.newSession.round[id]['exercisesId'].pop();
    		}
    	}

      this.updateExercisesAlternativesNumber(id);
  }

  updateExercisesAlternativesNumber(id:number){
    if (typeof this.newSession.round[id].exercisesAlternatives != undefined && this.newSession.round[id].exercisesAlternatives.length > 0){
        for (var i = 0; i < this.newSession.round[id].exercisesAlternatives.length ; i++){
          if (this.newSession.round[id].exercisesAlternatives[i].exercisesAltId.length < this.newSession.round[id].exercisesNumber){
           this.newSession.round[id].exercisesAlternatives[i].exercisesAltId.push(new Exercise());           
          }
          else if (this.newSession.round[id].exercisesAlternatives[i].exercisesAltId.length < this.newSession.round[id].exercisesNumber){
            this.newSession.round[id].exercisesAlternatives[i].exercisesAltId.pop();
          }
        }
    }
  }


  removeRound(){

        this.newSession.round.pop();
  }


  addRound(){

      
      var newRound =  new Round();
      this.newSession.round.push(newRound);    
  }

  deleteRound(id:number){
    debugger;
    this.newSession.round.splice(id, 1) ;
    this.roundNb = this.newSession.round.length;


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

//        this.exercisesList[i]._id == event.dataTransfer.getData("_id") ?   ( this.newSession.round[id].exercises.length < 1 ? this.newSession.round[id].exercises[0] = this.exercisesList[i] :  this.newSession.round[id].exercisesNumber > this.newSession.round[id].exercises.length ? this.newSession.round[id].exercises.push(this.exercisesList[i]) : this.newSession.round[id].exercises[this.newSession.round[id].exercises.length-1] = this.exercisesList[i]):'';
        this.exercisesList[i]._id == event.dataTransfer.getData("_id") ?  this.addExercise(this.exercisesList[i], id, type, idAtl) :'';
      }

    }
    else if(type=='alt'){
       for (var i = 0 ; i < this.exercisesList.length; i++){
              this.exercisesList[i]._id == event.dataTransfer.getData("_id") ?   this.addExercise(this.exercisesList[i], id, type, idAtl) :''
        }

    }


    this.dropAreaClass = 'dropOut';
  }

  drop2(event: CdkDragDrop<string[]>, round : number, idAtl : number) {
    debugger;
    if (event.previousContainer === event.container && event.container.id.slice(0, 16) != "exercise-dropped") {


      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);




    } 

    else if (event.previousContainer.id.slice(0, 13) === "exercise-list" && event.container != event.previousContainer ) {
      var type = "";
 

      event.container.id.slice(0, 3) === 'alt' ? type = "alt" : type ="main";
      this.addExercise(event.item.data, round, type, idAtl);

      // copyArrayItem(event.previousContainer.data,
      //                   event.container.data,
      //                   event.previousIndex,
      //                   event.currentIndex);
    

    }


    
  }



  addExercise(exercise, id : number, type: string, idAtl : number){

    //try to find the first empty exercise in the list
    debugger;
    var successed = false

    if (type=='main'){
      for (var i=0; i< this.newSession.round[id].exercisesId.length; i++){
        if (this.newSession.round[id].exercisesId[i].title== '' && successed == false){

            this.newSession.round[id].exercisesId[i]=exercise;
            successed = true;
            break;

        }
      }

    }
    // in case all exercise has been already selected we swap with the last one in the list
    if (type=='alt'){
      for (var i=0; i< this.newSession.round[id].exercisesAlternatives[idAtl].exercisesAltId.length; i++){
        if (this.newSession.round[id].exercisesAlternatives[idAtl].exercisesAltId[i].title== '' && successed == false){

            this.newSession.round[id].exercisesAlternatives[idAtl].exercisesAltId[i]=exercise;
            successed = true;
            break;

        }
      }

    }


    if (successed == false){
      type == 'main' ? this.newSession.round[id].exercisesId[this.newSession.round[id].exercisesId.length - 1]=exercise : this.newSession.round[id].exercisesAlternatives[idAtl].exercisesAltId[this.newSession.round[id].exercisesAlternatives[idAtl].exercisesAltId.length -1]=exercise;

    }

  //  this.newSession.round[id].exercises.length < 1 ? this.newSession.round[id].exercises[0] = this.exercisesList[i] :  this.newSession.round[id].exercisesNumber > this.newSession.round[id].exercises.length ? this.newSession.round[id].exercises.push(this.exercisesList[i]) : this.newSession.round[id].exercises[this.newSession.round[id].exercises.length-1] = this.exercisesList[i]):'';


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

  dropExercise(event : any){

    
    event.target.classList.remove('active'); 
  }


  roundChange(id){

    debugger;
    this.activAccordion == id ? this.activAccordion = null : this.activAccordion = id;
  }

// add alternative exercises to the round specified : max alternative : nb of attendees
  addAlternative(id){
    // typeof this.newSession.round[id].exercisesAlternatives =='undefined' ? this.newSession.round[id].exercisesAlternatives = new Array() :"";
    // typeof this.newSession.round[id].exercisesAlternativesUsers =='undefined' ? this.newSession.round[id].exercisesAlternativesUsers = new Array() :"";
    typeof this.newSession.round[id].exercisesAlternatives =='undefined' ? this.newSession.round[id].exercisesAlternatives = new Array() :"";
    this.newSession.round[id].exercisesAlternatives.length >= this.newSession.attendees.length-1 ? this.toastr.warning('Max exercises alternatives per round reached' , 'warning !', {timeOut: 2000}) : this.addAlternativeToRound(id); 
  }

  addAlternativeToRound(id){
    if (this.newSession.round[id].exercisesAlternatives.length==0){
    //    this.newSession.round[id].exercisesAlternatives[0] = new Array();
        this.newSession.round[id].exercisesAlternatives[0] = { 'usersId' : new Array(), 'exercisesAltId' : new Array()};
        this.newSession.round[id].exercisesId.map(exc =>
            {
              this.newSession.round[id].exercisesAlternatives[0].exercisesAltId.push(exc);
            })
    }
    else {
      var lt = this.newSession.round[id].exercisesAlternatives.length;
    //  this.newSession.round[id].exercisesAlternatives[lt] = new Array();
      this.newSession.round[id].exercisesAlternatives[lt] = { 'usersId' : new Array(), 'exercisesAltId' : new Array()};
      this.newSession.round[id].exercisesId.map(exc =>  {
            this.newSession.round[id].exercisesAlternatives[lt].exercisesAltId.push(exc);
          })
    }
  }


  deleteExercisesAlternatives(roundId:number,excAAltId:number){
    if (this.newSession.round[roundId].exercisesAlternatives.length==1){
      this.newSession.round[roundId].exercisesAlternatives = new Array();
      this.newSession.round[roundId].exercisesMainUser = new Array();
    }
    else {
      var t = new Array();
      t = this.newSession.round[roundId].exercisesAlternatives.filter(exc=>{
       !(exc.exercisesAltId == this.newSession.round[roundId].exercisesAlternatives[excAAltId].exercisesAltId);
      });
      this.newSession.round[roundId].exercisesAlternatives = t ;
      this.defineMainExerciseUser(roundId)
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
          exrcAlt.usersId.includes(attendee)
        }))

      })
      this.newSession.round[roundId].exercisesMainUser = att;  
    }
  }

  setRoundPreconfiguration(event:any, id:number){
    debugger;

    switch(event.value){

      case 1:{
        this.newSession.round[id].drillsDuration = 30;
        this.newSession.round[id].restDuration  = 5;
        this.newSession.round[id].repeat  = 3;
        this.newSession.round[id].exercisesNumber  = 7;
        this.updateExercisesNumber(id);
        this.newSession.round[id].title  == '' || 'A modifier' || 'Warm up' || 'Round' || 'Warm down' ? this.newSession.round[id].title  = 'Warm up': '';
        break;

      }

      case 2:{
        this.newSession.round[id].drillsDuration = 50;
        this.newSession.round[id].restDuration  = 10;
        this.newSession.round[id].repeat  = 3;
        this.newSession.round[id].exercisesNumber  = 3;
        this.updateExercisesNumber(id);
        this.newSession.round[id].title  == '' || 'A modifier' || 'Warm up' || 'Round' || 'Warm down' ? this.newSession.round[id].title  = 'Round': '';
        break;

      }

      case 3:{
        this.newSession.round[id].drillsDuration = 30;
        this.newSession.round[id].restDuration  = 5;
        this.newSession.round[id].repeat  = 3;
        this.newSession.round[id].exercisesNumber  = 3;
        this.updateExercisesNumber(id);
        this.newSession.round[id].title  == '' || 'A modifier' || 'Warm up' || 'Round' || 'Warm down' ? this.newSession.round[id].title  = 'Warm down': '';
        break;

      }


    }


  }

  exerciseFilter(event){
    debugger;
    let turnIn : boolean = false;
    turnIn = !this.filter[event.currentTarget.id];



    for (var k in this.filter){

      if (k == event.currentTarget.id){
        this.filter[event.currentTarget.id] = !this.filter[event.currentTarget.id]
      } 
      else {
        this.filter[k] = false;
      }
    }

    if (!turnIn &&event.currentTarget.id != 'any'){
      this.filter[event.currentTarget.id] = false;
      this.filter['any'] = true;
      
    }

    if (!turnIn &&event.currentTarget.id == 'any'){
      this.filter[event.currentTarget.id] = true;
      
    }


    this.exercisesListFiltered = this.exercisesList;
    if (this.filter[event.currentTarget.id] && event.currentTarget.id != 'any'){
            this.exercisesListFiltered = this.exercisesList.filter((a)=>
        {
        return a.details[event.currentTarget.id] == this.filter[event.currentTarget.id] 
      })
    }



  }
  compareAttendees(c1: User, c2: User){

        return c1 && c2 ? c1._id === c2._id : c1 === c2;

  }


}









    


