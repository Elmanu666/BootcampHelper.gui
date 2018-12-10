import { Response } from '@angular/http';
import { ExerciseService } from '../../services/exercise.service';
import Exercise from '../../models/exercise.model';
import File from '../../models/file.model';
import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FileService } from '../../services/file.service'
import { PagerComponent } from '../../common/pager/pager.component'
import { NgxSpinnerService } from 'ngx-spinner';




@Component({
  selector: 'bth-exerc-display',
  templateUrl: './exercise-display.component.html',
  styleUrls: ['./exercise-display.component.scss']
})
export class ExerciseDisplayComponent {


	constructor(
  	  private exerciseService: ExerciseService,
  		private route: ActivatedRoute,
    	private router: Router,
    	private toastr: ToastrService,
    	private fileService : FileService,
      private spinner: NgxSpinnerService

  	) { }
  id: string;
	images : File;
  exercise: Exercise;
  bodyPart: string[] = ["Abs", "Biceps", "Triceps", "Glutes", "Legs", "Shoulders", "Oblics", "Chest (middle)", "Chest (high)", "Chest (low)" ];
  materialType: string[] = ["elastic band","dumbbell", "Yoga ball","medcine ball", "TRX", "bench", "ball"];
  loaded:boolean = false

  ngOnInit() {

  //	let id = this.route.snapshot.paramMap.get('id');

    this.route.snapshot.paramMap.get('id') ? this.id = this.route.snapshot.paramMap.get('id') : this.id = "select";

    if (this.id == 'select'){


    }

    else {
     this.spinner.show();
     this.exerciseService.getExercise(this.id)
      .subscribe(
        exercise => {
          //assign the todolist property to the proper http response
          setTimeout(() => {

              this.spinner.hide();
              }, 200);
          this.exercise = exercise;
          this.loaded = true;
          this.getImage(this.exercise._id);
        },
        error=> {
              setTimeout(() => {
              this.spinner.hide();
              this.toastr.error('operation unsuccesful. try later', 'error!', {timeOut:2000})
            }, 200);


        })
      }






  }

  deleteExercise(exercise:Exercise){


  	  this.exerciseService.deleteExercise(exercise._id).subscribe(res => {
      	this.toastr.success('Delete succesful', 'Success!' , {timeOut: 2000});

    })
  }


  editExercise(exercise:Exercise){

  	    this.router.navigate(['exercise/edit/'+exercise._id]);


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