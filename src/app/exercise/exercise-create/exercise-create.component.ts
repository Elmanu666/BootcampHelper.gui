import { Response } from '@angular/http';
import { ExerciseService } from '../../services/exercise.service';
import Exercise from '../../models/exercise.model';
import File from '../../models/file.model';
import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FileService } from '../../services/file.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from '../../../environments/environment';






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
      private spinner: NgxSpinnerService

  	) { }
  images : File[];
  exercise: Exercise;
  bodyPart: string[] = ["Abs", "Biceps", "Triceps", "Glutes", "Legs", "Shoulders", "Oblics", "Chest (middle)", "Chest (high)", "Chest (low)" ];
  materialType: string[] = ["elastic band","dumbbell", "Yoga ball","medcine ball", "TRX", "bench", "ball"];
  id: string;

   img_url = environment.imgUrl || 'http://localhost:3000/';



  ngOnInit() {

  	 this.route.snapshot.paramMap.get('id') ? this.id = this.route.snapshot.paramMap.get('id') : this.id = "create";
    console.log('img_url', this.img_url);
  	console.log(this.id);

    if (this.id === "create") {

           this.exercise = new Exercise();



    }

    else {
      this.spinner.show();
      this.exerciseService.getExercise(this.id)
      .subscribe(
        exercise => {
        //assign the todolist property to the proper http response
        this.exercise = exercise;
        console.log("on reçoit l'exercise");
        console.log(exercise);
        this.getImage(this.exercise._id);
        setTimeout(() => {

            this.spinner.hide();
            }, 200);
        },
        error => {
          console.log(error);
          setTimeout(() => {
              this.spinner.hide();
              this.toastr.error('operation unsuccesful. try later', 'error!', {timeOut:2000})
            }, 200);
    



        }


        )


 


    }

  }

  create() {
    this.spinner.show();
    this.exerciseService.createExercise(this.exercise)
      .subscribe((res) => {
        setTimeout(()=>{
          this.spinner.hide();
          this.toastr.success('Creation succesful', 'Success!' , {timeOut: 2000});
        }, 200);
        this.exercise = res.data;
        
        this.id = this.exercise._id;
      })
  }


  update(event) {

   
    if (event !='create') {
       this.spinner.show();
       this.exerciseService.editExercise(this.exercise).subscribe(res => {
          setTimeout(()=>{
            this.spinner.hide();
            this.toastr.success('Creation succesful', 'Success!' , {timeOut: 2000});
          }, 200);

        }, err => {
          setTimeout(()=>{
            this.spinner.hide();
            this.toastr.error('Update Unsuccesful', 'Error!' , {timeOut: 2000});
          }, 200);          
          
        })
    }

  }


  newExercise(){
    this.exercise = new Exercise();
    this.id = "create";


  }

  getImage(id){
    debugger;
    this.fileService.getImages(id)
    .subscribe(retApi => {
            //assign the todolist property to the proper http response
            this.images = retApi.data.docs;

            



          })
     }

  removeImage(img){

    this.spinner.show();


    this.fileService.deleteImage(img._id)
    .subscribe(retApi => {
            //assign the todolist property to the proper http response

            debugger;

           this.images =  this.images.filter( imgs => {

              return imgs._id !== img._id;
            })
               this.spinner.hide();

          })

  }




}