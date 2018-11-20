import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicFormQuestionComponent } from './dynamic-form-question/dynamic-form-question.component';
import { QuestionService } from './question.service';
import { DynamicFormComponent } from './dynamic-form/dynamic-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { IonRangeSliderModule } from "ng2-ion-range-slider";



@NgModule({
  imports: 
  [
    CommonModule,
    ReactiveFormsModule,
    IonRangeSliderModule
  ],
  declarations: 
  [
  	DynamicFormQuestionComponent,
  	DynamicFormComponent
  ],
  exports: 
  [
  	DynamicFormQuestionComponent,
  	DynamicFormComponent
  ],
  providers: 
  [
  	QuestionService
  ],
})
export class DynamicFormModule { }
