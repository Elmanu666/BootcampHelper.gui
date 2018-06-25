import { Response } from '@angular/http';
import { ExerciseService } from '../../services/exercise.service';
import Exercise from '../../models/exercise.model';
import File from '../../models/file.model';
import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FileService } from '../../services/file.service';




@Component({
  selector: 'bth-exerc-create',
  templateUrl: './exercise-create.component.html',
 // styleUrls: ['./exercise-create.component.scss']
})
export class ExerciseCreateComponent {


	constructor(
  	  	private exerciseService: ExerciseService,
  		private route: ActivatedRoute,
    	private router: Router,
      private toastr : ToastrService,
      private fileService : FileService,

  	) { }
  images : File;
  exercise: Exercise;
  bodyPart: string[] = ["Abs", "Biceps", "Triceps", "Glutes", "Legs", "Shoulders", "Oblics", "Chest (middle)", "Chest (high)", "Chest (low)" ];
  materialType: string[] = ["elastic band","dumbbell", "Yoga ball","medcine ball", "TRX", "bench", "ball"];
  id: string;

  ngOnInit() {

  	this.id = this.route.snapshot.paramMap.get('id') ? this.route.snapshot.paramMap.get('id') : "create";

  	console.log(this.id);

    if (this.id === "create") {

           this.exercise = new Exercise();



    }

    else {

      this.exerciseService.getExercise(this.id)
      .subscribe(exercise => {
        //assign the todolist property to the proper http response
        this.exercise = exercise;
        console.log("on reçoit l'exercise");
        console.log(exercise);
        this.getImage(this.exercise._id);




      })

 


    }

  }

  create() {
    this.exerciseService.createExercise(this.exercise)
      .subscribe((res) => {
        this.exercise = res.data;
        this.toastr.success('Creation succesful', 'Success!' , {timeOut: 2000});
        this.id = this.exercise._id;
      })
  }


  update(event) {


    if (event !='create') {

       this.exerciseService.editExercise(this.exercise).subscribe(res => {
          console.log('Update Succesful')
          this.toastr.success('Update succesful', 'Success!' , {timeOut: 2000});

        }, err => {

          this.toastr.error('Update Unsuccesful', 'Error!' , {timeOut: 2000});
        })

    }


        

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




}