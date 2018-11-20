import { Component, Input, OnInit } from '@angular/core';
import {ReactiveFormsModule, FormsModule, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
 
import { QuestionBase }     from '../models/question-base.model';


@Component({
  selector: 'app-question',
  templateUrl: './dynamic-form-question.component.html',
  styleUrls: ['./dynamic-form-question.component.scss']
})
export class DynamicFormQuestionComponent  {

 

  @Input() question: QuestionBase<any>;
  @Input() form: FormGroup;
  @Input() disable: boolean;
  get isValid() { return this.form.controls[this.question.key].valid; }


  rangeValueUpdate(sliderEvent){

//  	this.form.controls[this.question.key].value = sliderEvent.from;
  	this.form.controls[this.question.key].setValue(sliderEvent.from); 

  }


}


