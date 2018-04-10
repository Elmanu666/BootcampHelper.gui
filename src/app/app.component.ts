import { Response } from '@angular/http';
import { ExerciseService } from './services/exercise.service';
import Exercise from './models/exercise.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  

	  constructor(
    //Private todoservice will be injected into the component by Angular Dependency Injector
    private exerciseService: ExerciseService
  ) { }

  //Declaring the new todo Object and initilizing it
  public newExercise: Exercise = new Exercise()

  //An Empty list for the visible todo list
  exercisesList: Exercise[];

  editExercises: Exercise[] = [];




  ngOnInit(): void {

    //At component initialization the 
    this.exerciseService.getExercises()
      .subscribe(exercises => {
        //assign the todolist property to the proper http response
        this.exercisesList = exercises
        console.log('on a récupéré les exerices')
        console.log(exercises)
      })
  }

   create() {
    this.exerciseService.createExercise(this.newExercise)
      .subscribe((res) => {
        this.exercisesList.push(res.data)
        this.newExercise = new Exercise()
      })
  }


    editExercise(exercise: Exercise) {
    console.log(exercise)
    if(this.exercisesList.includes(exercise)){
      if(!this.editExercises.includes(exercise)){
        this.editExercises.push(exercise)
      }else{
      	console.log('on passe pas l edit')
        this.editExercises.splice(this.editExercises.indexOf(exercise), 1)
        this.exerciseService.editExercise(exercise).subscribe(res => {
          console.log('Update Succesful')
        }, err => {
          this.editExercise(exercise)
          console.error('Update Unsuccesful')
        })
      }
    }
  }



    submitExercise(event, exercise:Exercise){
    if(event.keyCode ==13){

    	this.exerciseService.createExercise(exercise).subscribe(res =>{

    		console.log('creation done')
    	},err => {

    		console.error('error creation')

    	})
 //     this.editExercise(exercise)
    }
  }

  deleteExercise(exercise: Exercise) {
    this.exerciseService.deleteExercise(exercise._id).subscribe(res => {
      this.exercisesList.splice(this.exercisesList.indexOf(exercise), 1);
    })
  }

  doneEditing(exercise: Exercise) {

  	this.editExercises.splice(this.editExercises.indexOf(exercise), 1);

  }

}
