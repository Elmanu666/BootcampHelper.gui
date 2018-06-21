import { Response } from '@angular/http';
import { ExerciseService } from '../../services/exercise.service';
import Exercise from '../../models/exercise.model';
import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { PagerService } from '../../services/pages.service';
import Page from '../../models/pages.model';
import { Router } from '@angular/router';


@Component({
  selector: 'bth-exerc-list',
  templateUrl: './exercise-list.component.html',
  styleUrls: ['./exercise-list.component.scss']
})
export class ExerciseListComponent {
  

	  constructor(
    //Private todoservice will be injected into the component by Angular Dependency Injector
    public toastr: ToastrService,
    private exerciseService: ExerciseService,
    private pagerService: PagerService,
    private router : Router


  ) {
      }

  //Declaring the new todo Object and initilizing it
  public newExercise: Exercise = new Exercise()

  //An Empty list for the visible todo list
  exercisesList: Exercise[];

  editExercises: Exercise[] = [];
  
  //to do passer par un service
  bodyPart: string[] = ["Abs", "Biceps", "Triceps", "Glutes", "Legs", "Shoulders", "Oblics", "Chest (middle)", "Chest (high)", "Chest (low)" ];
  materialType: string[] = ["elastic band","dumbbell", "Yoga ball","medcine ball", "TRX", "bench", "ball"];
  pagesInfo : Page = new Page();




  ngOnInit(): void {
  	console.log(this.pagesInfo);

    //At component initialization the 

    this.exerciseService.getExercises(1)
      .subscribe(exercises => {
        //assign the todolist property to the proper http response
        this.exercisesList = exercises;
        this.pagesInfo = this.pagerService.getPager();
        console.log('pagesInfo :');
        console.log(this.pagesInfo)


      })
  }

   create() {
    this.exerciseService.createExercise(this.newExercise)
      .subscribe((res) => {
        this.exercisesList.push(res.data)
        this.newExercise = new Exercise()
      })
  }


  getExercice(page){

  		this.exerciseService.getExercises(page)
		      .subscribe(exercises => {
		        //assign the todolist property to the proper http response
		        this.exercisesList = exercises;
		        this.pagesInfo = this.pagerService.getPager();



		      })



  }

  displayExercise(id: Exercise['_id']){

    console.log('display exercise click')

    this.router.navigate(['exercise/detail/'+id]);




  }


    editExercise(event, exercise: Exercise) {

    if(this.exercisesList.includes(exercise)){
      if(!this.editExercises.includes(exercise)){
      	this.editExercises = []
        this.editExercises.push(exercise)
      }else{

 //       this.editExercises.splice(this.editExercises.indexOf(exercise), 1)
        this.exerciseService.editExercise(exercise).subscribe(res => {
          console.log('Update Succesful')
          this.toastr.success('Update succesful', 'Success!' , {timeOut: 2000});

        }, err => {
          this.editExercise(err, exercise)
          console.error('Update Unsuccesful')
          this.toastr.error('Update Unsuccesful', 'Error!' , {timeOut: 2000});
        })
      }
    }
  }



    submitExercise(event, exercise:Exercise){
    	console.log('on est dans le submitExercise')
    	console.log(event)
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
      this.toastr.success('Delete succesful', 'Success!' , {timeOut: 2000});

    })
  }

  doneEditing(exercise: Exercise) {

  	this.editExercises.splice(this.editExercises.indexOf(exercise), 1);

  }

}
