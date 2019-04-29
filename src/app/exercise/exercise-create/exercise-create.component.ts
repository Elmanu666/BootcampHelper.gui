import { Response } from '@angular/http';
import { ExerciseService } from '../../services/exercise.service';
import Exercise from '../../models/exercise.model';

import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from '../../../environments/environment';
import { BodyPartService } from '../../services/bodyPart.service';
import {ReactiveFormsModule, FormsModule, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';


import {QuestionBase} from '../../dynamic-form/models/question-base.model';
import {DropdownQuestion} from '../../dynamic-form/models/question-dropdown.model';
import {TextboxQuestion} from '../../dynamic-form/models/question-textbox.model';
import {RangeSimpleQuestion} from '../../dynamic-form/models/question-range-simple.model';
import {TextAreaQuestion} from '../../dynamic-form/models/question-text-area.model';
import {CheckBoxQuestion} from '../../dynamic-form/models/question-checkBox.model';
import {SelectMultipleQuestion} from '../../dynamic-form/models/question-select-multiple.model';

import {FilesManagementComponent} from '../../files-management/files-management/files-management.component';







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

      private spinner: NgxSpinnerService,
      private bodyPartService: BodyPartService,

  	) { }
  images : File[];
  dynForm; edit; creation; view; ready :boolean;
  exercise: Exercise;
  bodyPartList: string[] = ["Abs", "Biceps", "Triceps", "Glutes", "Legs", "Shoulders", "Oblics", "Chest (middle)", "Chest (high)", "Chest (low)" ];
  materialType: string[] = ["elastic band","dumbbell", "Yoga ball","medcine ball", "TRX", "bench", "ball"];
  id: string;
  exerciseForm: FormGroup;
  title; description; muscu; cardio; warmup; balance;bodyPart;material:FormControl;
  questionsExercises: QuestionBase<any>[];


  img_url = environment.imgUrl || 'http://localhost:3000/';



  ngOnInit() {
    this.dynForm = true;
    this.route.snapshot.routeConfig.path.slice(0,6) == 'detail' ? (this.view = true, this.edit = false, this.creation=false): '';
    this.route.snapshot.routeConfig.path.slice(0,6) == 'create' ? (this.view = false, this.edit = false, this.creation=true): '';
    this.route.snapshot.routeConfig.path.slice(0,4) == 'edit' ? (this.view = false, this.edit = true, this.creation=false): '';
  	this.route.snapshot.paramMap.get('id') ? this.id = this.route.snapshot.paramMap.get('id') : '';
    this.bodyPartList = this.bodyPartService.getBodyPart();

    if (this.creation) {
          this.exercise = new Exercise();
          // this.createFormControls();
          // this.formInit();
          this.questionsExercises = this.ExercisesToQuestions();
          this.ready = true;

    }

    else {
      this.spinner.show();
      this.exerciseService.getExercise(this.id)
      .subscribe(
        exercise => {
          this.exercise = exercise;
          this.questionsExercises = this.ExercisesToQuestions();
          // this.createFormControls();
          // this.formInit();
          this.ready = true;
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

  createFormControls(){
    this.title = new FormControl({value:this.exercise.title, disabled:this.view}, [Validators.required, Validators.minLength(5)]);
    this.description = new FormControl({value:this.exercise.description, disabled: this.view}, Validators.required);

    this.muscu = new FormControl({value:this.exercise.details.muscu, disabled: this.view});
    this.cardio = new FormControl({value:this.exercise.details.cardio, disabled: this.view});
    this.balance = new FormControl({value:this.exercise.details.balance, disabled: this.view});

    this.warmup = new FormControl({value:this.exercise.details.warmup, disabled: this.view});
    this.bodyPart = new FormControl({value:this.exercise.details.bodyPart, disabled: this.view}, Validators.required);
    this.material = new FormControl({value:this.exercise.material, disabled: this.view});


  }

  onSubmit(value){
    this.formToExercise(value);
    if (this.creation){
      this.create();
    }
    else if(this.update) {
      this.update();
    }




  }


  formInit(){

    this.exerciseForm = new FormGroup({
        title: this.title,
        description : this.description,
        muscu : this.muscu,
        cardio : this.cardio,
        balance : this.balance,
        warmup : this.warmup,
        bodyPart : this.bodyPart,
        material : this.material,

    });
  }


  create() {
    this.spinner.show();;
    this.exerciseService.createExercise(this.exercise)
      .subscribe(
        res => {
          setTimeout(()=>{
            this.spinner.hide();
            this.toastr.success('Creation succesful', 'Success!' , {timeOut: 2000});
          }, 200);
          this.exercise = res.data;        
          this.id = this.exercise._id;
          this.edit= true;
          this.creation= false;
          this.view= false;
      }, err => {
           setTimeout(()=>{
            this.spinner.hide();
            this.toastr.error('Creation Unsuccesful', 'Error!' , {timeOut: 2000});
          }, 200);


      })
  }


  update() {

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

  formToExercise(value){
    this.exercise.title = value.title;
    this.exercise.description = value.description;
    this.exercise.details.muscu = value.muscu || false;
    this.exercise.details.cardio = value.cardio || false;
    this.exercise.details.balance = value.balance || false;
    this.exercise.details.warmup = value.warmup || false;
    this.exercise.details.bodyPart = value.bodyPart;
    this.exercise.material = value.material;
    this.exercise.hidden = false;
  }

  newExercise(){
    this.exercise = new Exercise();
    this.id = "create";


  }




/* change by redirecting to trigger new API call */

  viewExercise(){
    this.router.navigate(['exercise/detail/'+this.id]);
  }  

  editExercise(){
    this.router.navigate(['exercise/edit/'+this.id]);
  }  

  deleteExercise(){
    this.spinner.show();
    this.exerciseService.deleteExercise(this.id).subscribe(res => {

      this.spinner.hide();
      this.toastr.success('Delete succesful', 'Success!' , {timeOut: 2000});
      setTimeout(()=>{
        this.router.navigate(['exercise/list']);
      }, 300)

  })
  }

  ExercisesToQuestions(){

    let questions : QuestionBase<any>[] = [
      new TextboxQuestion({
            key: 'title',
            label: 'Title',
            value: this.exercise.title,
            required: true,
            order: 1
            }),
      new TextAreaQuestion({
            key: 'description',
            label: 'Description',
            value: this.exercise.description,
            required: true,
            order: 2
            }),
      new CheckBoxQuestion({
            key: 'muscu',
            label: 'Muscu',
            value: this.exercise.details.muscu,
            required: false,
            order: 3
            }),
      new CheckBoxQuestion({
            key: 'cardio',
            label: 'Cardio',
            value: this.exercise.details.cardio,
            required: false,
            order: 4
            }),

      new CheckBoxQuestion({
            key: 'balance',
            label: 'Balance',
            value: this.exercise.details.balance,
            required: false,
            order: 5
            }),
      new CheckBoxQuestion({
            key: 'warmup',
            label: 'Warmup',
            value: this.exercise.details.warmup,
            required: false,

            order: 5
            }),
      new SelectMultipleQuestion({
            key: 'bodyPart',
            label: 'Body part',
            value: this.exercise.details.bodyPart,
            options: this.convertToValueForSelect(this.bodyPartList),  
            required: false,
            order: 6
            }),
      new SelectMultipleQuestion({
            key: 'material',
            label: 'Material',
            value: this.exercise.material,
            options: this.convertToValueForSelect(this.materialType),
            required: false,           
            order: 7
            })

    ]

    return questions.sort((a, b)=> a.order - b.order);

  }

  convertToValueForSelect(lists:string[]){

    let listValue :{'value': string, 'key': string}[];
    listValue = new Array();

    lists.forEach(list =>{
      listValue.push({'value' : list, 'key' : list})

    })

    return listValue



  }


}