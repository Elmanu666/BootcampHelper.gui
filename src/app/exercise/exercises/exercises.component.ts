import { Response } from '@angular/http';
import { ExerciseService } from '../../services/exercise.service';
import Exercise from '../../models/exercise.model';
import { FileService } from '../../services/file.service';
import File from '../../models/file.model';

import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { PagerService } from '../../services/pages.service';



import Page from '../../models/pages.model';


@Component({
  selector: 'app-root',
  templateUrl: './exercises.component.html',
  styleUrls: ['../../app.component.scss']
})
export class ExercisesComponent {
  

	  constructor(
    //Private todoservice will be injected into the component by Angular Dependency Injector
    public toastr: ToastrService, vcr: ViewContainerRef,
    private exerciseService: ExerciseService,
    private pagerService: PagerService,
    private fileService: FileService

  ) { 
	  }

  //Declaring the new exercise Object and initilizing it
  public newExercise: Exercise = new Exercise()

  //An Empty list for the visible todo list

  images : File;
  exercisesList: Exercise[];

  editExercises: Exercise[] = [];
  viewExercises: Exercise[] = [];
  
  //to do passer par un service
  bodyPart: string[] = ["Abs", "Biceps", "Triceps", "Glutes", "Legs", "Shoulders", "Oblics", "Chest (middle)", "Chest (high)", "Chest (low)" ];
  materialType: string[] = ["elastic band","dumbbell", "Yoga ball","medcine ball", "TRX", "bench", "ball"];
  pagesInfo : Page = new Page();

  creatorView : boolean = true;




  ngOnInit(): void {


    //At component initialization the

    let page : number = 1; 

    this.exerciseService.getExercises(page)
      .subscribe(exercises => {
        //assign the todolist property to the proper http response
        this.exercisesList = exercises;
        this.pagesInfo = this.pagerService.getPager();



      })
  }

   create() {
    this.exerciseService.createExercise(this.newExercise)
      .subscribe((res) => {
        this.exercisesList.push(res.data)
        this.newExercise = new Exercise()
      })
  }

  createExerciseViewOpen(){

  	this.creatorView = false;
  	console.log(this.creatorView)


  }

  createExerciseViewClose(){

  	this.creatorView = true;
  	  	console.log(this.creatorView)


  }


  getExercice(page:number){

  		this.exerciseService.getExercises(page)
		      .subscribe(exercises => {
		        //assign the todolist property to the proper http response
		        this.exercisesList = exercises;
		        this.pagesInfo = this.pagerService.getPager();



		      })



  }


  viewExcerise(exercise:Exercise){

  	this.viewExercises.push(exercise);

  	console.log(this.viewExercises);
  }


    editExercise(event, exercise: Exercise) {

    if(this.exercisesList.includes(exercise)){
      if(!this.editExercises.includes(exercise)){
      	this.editExercises = []
        this.editExercises.push(exercise)
        this.getImage(exercise._id);
      }else{

        console.log(exercise)

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



    submitExercise(){
    	console.log('on est dans le submitExercise')
  

    	this.exerciseService.createExercise(this.newExercise).subscribe(res =>{
    		  this.toastr.success('Creation succesful', 'Success!' , {timeOut: 2000});
    		  this.newExercise = new Exercise()
    	},err => {

    		console.error('error creation')

    	})
 //     this.editExercise(exercise)
    
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

  getImage(id){
  	this.fileService.getImages(id)
		.subscribe(retApi => {
		        //assign the todolist property to the proper http response
		        this.images = retApi.data.docs;
		        console.log('retour api image');
		        console.log(this.images)
		        



		      })




  }
  removeImage(img:File){
  	this.fileService.deleteImage(img._id)
  	.subscribe(res =>{
  		   this.getImage(img.exerciseId);
  	})


  }

}
