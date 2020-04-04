import { Component, OnInit, Input } from '@angular/core';
import Round from '../models/round.model';
import Exercise from '../models/exercise.model';
import User from '../models/user.model';
import {ExerciseService} from '../services/exercise.service';
import {MatFormFieldModule, MatInputModule} from '@angular/material';
import {CdkDragDrop, moveItemInArray, transferArrayItem, copyArrayItem} from '@angular/cdk/drag-drop';
import { ToastrService } from 'ngx-toastr';

import { trigger, state, style, animate, transition, query, stagger } from '@angular/animations';


import { bchTooltipComponent } from '../tooltip/bch-tooltip.component';
import { bchTooltipDirective } from '../tooltip/bch-tooltip.directive';



@Component({
  selector: 'app-round',
  templateUrl: './round.component.html',
  styleUrls: ['./round.component.scss'],  
})
export class RoundComponent implements OnInit {

	@Input() editable : boolean;
	@Input() roundId : number;
	@Input() round : Round;
	@Input() attendees:User[];
	exercisesList :Exercise[];
	exercisesListFiltered :Exercise[];
	loaded:boolean;
	dropAreaClass : string;
	filter:{'any':boolean, 'cardio': boolean, 'muscu': boolean, 'balance': boolean, 'warmup':boolean} ;


  constructor(
    private exerciseService:ExerciseService,
    public toastr: ToastrService
    ) { }

  ngOnInit() {
  	this.filter = {'any':true, 'cardio': false, 'muscu': false, 'balance': false, 'warmup':false}
  	this.loaded=false;
  	this.exerciseService.getExercises(1)
      .subscribe(exercises => {
        //assign the todolist property to the proper http response
        exercises.sort((a,b) => {
          a.title.localeCompare(b.title)
        });
        exercises.sort((a,b) => a['title'].localeCompare(b['title']))
        this.exercisesList = exercises;
        this.exercisesListFiltered = exercises;
        this.loaded=true;
      //  this.pagesInfo = this.pagerService.getPager();
      })
  }



  deleteExerciseSelected(idRound:number, idExercise:number, type:string, exAltId :number){
    
    if (type=='main'){
     var tmp = this.round.exercisesId.filter(exr=>{
        return !(exr ==this.round.exercisesId[idExercise]); 


      })

      this.round.exercisesId = tmp;
      this.round.exercisesId.length < this.round.exercisesNumber ? this.round.exercisesId.push(new Exercise()): '';

    }

    else if (type=='alt'){
     var tmp = this.round.exercisesAlternatives[exAltId].exercisesAltId.filter(exr=>{
        return !(exr ==this.round.exercisesAlternatives[exAltId].exercisesAltId[idExercise]); 


      })

      this.round.exercisesAlternatives[exAltId].exercisesAltId = tmp;
      this.round.exercisesAlternatives[exAltId].exercisesAltId.length < this.round.exercisesNumber ? this.round.exercisesAlternatives[exAltId].exercisesAltId.push(new Exercise()):'';

    }
  }

  sort(event: any, roundId:number, type:string, excAltId:number) {
   
   if(type ==='main'){
    const current = this.round.exercisesId[event.currentIndex];
    const swapWith = this.round.exercisesId[event.newIndex];

    this.round.exercisesId[event.newIndex] = current;
    this.round.exercisesId[event.currentIndex] = swapWith;
   } 

   else if(type==='alt'){
    const current = this.round.exercisesAlternatives[excAltId].exercisesAltId[event.currentIndex];
    const swapWith = this.round.exercisesAlternatives[excAltId].exercisesAltId[event.newIndex];

    this.round.exercisesAlternatives[excAltId].exercisesAltId[event.newIndex] = current;
    this.round.exercisesAlternatives[excAltId].exercisesAltId[event.currentIndex] = swapWith;

   }
  }

  updateExercisesNumber(id){

    	var i = this.round['exercisesId'].length;
    	if(this.round['exercisesId'].length < this.round.exercisesNumber){
    		for (var v=0; v < this.round.exercisesNumber- i; v++){
  				this.round['exercisesId'].push(new Exercise());         
    		}
    	}

    	if (this.round['exercisesId'].length > this.round.exercisesNumber){
    		for (var v=0; v < this.round.exercisesNumber- i; v++){
				this.round['exercisesId'].pop();
    		}
    	}

      this.updateExercisesAlternativesNumber(id);
  }

  updateExercisesAlternativesNumber(id:number){
    if (typeof this.round.exercisesAlternatives != undefined && this.round.exercisesAlternatives.length > 0){
        for (var i = 0; i < this.round.exercisesAlternatives.length ; i++){
          if (this.round.exercisesAlternatives[i].exercisesAltId.length < this.round.exercisesNumber){
           this.round.exercisesAlternatives[i].exercisesAltId.push(new Exercise());           
          }
          else if (this.round.exercisesAlternatives[i].exercisesAltId.length < this.round.exercisesNumber){
            this.round.exercisesAlternatives[i].exercisesAltId.pop();
          }
        }
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

//   drop(event: any, id : number, type: string, idAtl : number){
//     event.preventDefault();
//     event.stopPropagation();
    
//     if(type == 'main'){
//       for (var i = 0 ; i < this.exercisesList.length; i++){

// //        this.exercisesList[i]._id == event.dataTransfer.getData("_id") ?   ( this.round.exercises.length < 1 ? this.round.exercises[0] = this.exercisesList[i] :  this.round.exercisesNumber > this.round.exercises.length ? this.round.exercises.push(this.exercisesList[i]) : this.round.exercises[this.round.exercises.length-1] = this.exercisesList[i]):'';
//         this.exercisesList[i]._id == event.dataTransfer.getData("_id") ?  this.addExercise(this.exercisesList[i], id, type, idAtl) :'';
//       }

//     }
//     else if(type=='alt'){
//        for (var i = 0 ; i < this.exercisesList.length; i++){
//               this.exercisesList[i]._id == event.dataTransfer.getData("_id") ?   this.addExercise(this.exercisesList[i], id, type, idAtl) :''
//         }

//     }


//     this.dropAreaClass = 'dropOut';
//   }

  drop2(event: CdkDragDrop<string[]>, round : number, idAtl : number) {
    debugger;
    if (event.previousContainer === event.container && event.container.id.slice(0, 16) != "exercise-dropped") {


      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);




    } 

    else if (event.previousContainer.id.slice(0, 13) === "exercise-list" && event.container != event.previousContainer ) {
      var type = "";
 

      event.container.id.slice(0, 3) === 'alt' ? type = "alt" : type ="main";
      this.addExercise(event.item.data, round, type, idAtl, event.currentIndex);

      // copyArrayItem(event.previousContainer.data,
      //                   event.container.data,
      //                   event.previousIndex,
      //                   event.currentIndex);
    

    }


    
  }



  addExercise(exercise:Exercise, id : number, type: string, idAtl : number, dropIndex : number){

    //try to find the first empty exercise in the list

    //var successed = false



    if (type == 'main'){
      this.round.exercisesId[dropIndex].title==''? this.round.exercisesId.splice(dropIndex, 1, exercise):this.round.exercisesId.splice(dropIndex, 0, exercise) ;
 
      this.round.exercisesId.length > this.round.exercisesNumber ? this.round.exercisesId.length = this.round.exercisesNumber : "";

    }

    else if (type == 'alt'){
      this.round.exercisesAlternatives[idAtl].exercisesAltId[dropIndex].title==''? this.round.exercisesAlternatives[idAtl].exercisesAltId.splice(dropIndex, 1, exercise): this.round.exercisesAlternatives[idAtl].exercisesAltId.splice(dropIndex, 0, exercise);

      this.round.exercisesAlternatives[idAtl].exercisesAltId.length > this.round.exercisesNumber ? this.round.exercisesAlternatives[idAtl].exercisesAltId.length = this.round.exercisesNumber : "";


    }

    // if (type=='main'){
    //   for (var i=0; i< this.round.exercisesId.length; i++){
    //     if (this.round.exercisesId[i].title== '' && successed == false){

    //         this.round.exercisesId[i]=exercise;
    //         successed = true;
    //         break;

    //     }
    //   }

    // }
    // // in case all exercise has been already selected we swap with the last one in the list
    // if (type=='alt'){
    //   for (var i=0; i< this.round.exercisesAlternatives[idAtl].exercisesAltId.length; i++){
    //     if (this.round.exercisesAlternatives[idAtl].exercisesAltId[i].title== '' && successed == false){

    //         this.round.exercisesAlternatives[idAtl].exercisesAltId[i]=exercise;
    //         successed = true;
    //         break;

    //     }
    //   }

    // }


    // if (successed == false){
    //   type == 'main' ? this.round.exercisesId[this.round.exercisesId.length - 1]=exercise : this.round.exercisesAlternatives[idAtl].exercisesAltId[this.round.exercisesAlternatives[idAtl].exercisesAltId.length -1]=exercise;

    // }

  //  this.round.exercises.length < 1 ? this.round.exercises[0] = this.exercisesList[i] :  this.round.exercisesNumber > this.round.exercises.length ? this.round.exercises.push(this.exercisesList[i]) : this.round.exercises[this.round.exercises.length-1] = this.exercisesList[i]):'';


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

    addAlternative(id){
    // typeof this.eound].exercisesAlternatives =='undefined' ? this.newSession.round[id].exercisesAlternatives = new Array() :"";
    // typeof this.newSession.round[id].exercisesAlternativesUsers =='undefined' ? this.newSession.round[id].exercisesAlternativesUsers = new Array() :"";
    typeof this.round.exercisesAlternatives =='undefined' ? this.round.exercisesAlternatives = new Array() :"";
    this.round.exercisesAlternatives.length >= this.attendees.length-1 ? this.toastr.warning('Max exercises alternatives per round reached' , 'warning !', {timeOut: 2000}) : this.addAlternativeToRound(id); 
  }



	addAlternativeToRound(id){
	    if (this.round.exercisesAlternatives.length==0){
	    //    this.round.exercisesAlternatives[0] = new Array();
	        this.round.exercisesAlternatives[0] = { 'usersId' : new Array(), 'exercisesAltId' : new Array()};
	        this.round.exercisesId.map(exc =>
	            {
	              this.round.exercisesAlternatives[0].exercisesAltId.push(exc);
	            })
	    }
	    else {
	      var lt = this.round.exercisesAlternatives.length;
	    //  this.round.exercisesAlternatives[lt] = new Array();
	      this.round.exercisesAlternatives[lt] = { 'usersId' : new Array(), 'exercisesAltId' : new Array()};
	      this.round.exercisesId.map(exc =>  {
	            this.round.exercisesAlternatives[lt].exercisesAltId.push(exc);
	          })
	    }
	  }


  deleteExercisesAlternatives(roundId:number,excAAltId:number){
    if (this.round.exercisesAlternatives.length==1){
      this.round.exercisesAlternatives = new Array();
      this.round.exercisesMainUser = new Array();
    }
    else {
      var t = new Array();
      t = this.round.exercisesAlternatives.filter(exc=>{
       !(exc.exercisesAltId == this.round.exercisesAlternatives[excAAltId].exercisesAltId);
      });
      this.round.exercisesAlternatives = t ;
      this.defineMainExerciseUser(roundId)
    }
  }


   defineMainExerciseUser(roundId: number){
    if(this.round.exercisesAlternatives.length > 0){
      var att = this.attendees.filter(attendee=>{
        return !(this.round.exercisesAlternatives.map(exrcAlt=>{
          exrcAlt.usersId.includes(attendee)
        }))

      })
      this.round.exercisesMainUser = att;  
    }
  }



  altUserSelection(event:any){
    var usr = this.attendees.filter(attendee=>{
      return !event.value.includes(attendee);
    })
    this.round.exercisesMainUser = new Array();
    this.round.exercisesMainUser = usr;
  }




   exerciseFilter(event){
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
