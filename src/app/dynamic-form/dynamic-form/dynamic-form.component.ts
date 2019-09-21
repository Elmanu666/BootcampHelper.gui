import { Component, Input, OnInit, Output, OnChanges, EventEmitter, SimpleChanges }  from '@angular/core';
import { FormGroup, FormControl, Validators }  from '@angular/forms';

import { QuestionBase }              from '../models/question-base.model';
import { QuestionService }    from '../question.service';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss'],
  providers: [ QuestionService ]
})
export class DynamicFormComponent implements OnInit, OnChanges {

	@Input() questions: QuestionBase<any>[] = [];
	questions2display: QuestionBase<any>[] = [];
	@Input() disable: boolean;
	@Input() update:number;
	form: FormGroup;
	payLoad = '';
	@Output() saveForm = new EventEmitter();

	constructor(private qcs: QuestionService) { }

	ngOnInit() {
		this.questions2display = this.questions.map(x=>x);
		typeof this.disable != undefined ? this.disable : this.disable = false ;
		this.form = this.qcs.toFormGroup(this.questions2display);
		this.disable == true ? this.form.disable() : '';
		this.update=0;
	}

	ngOnChanges(simples:SimpleChanges){
		debugger;
		if (typeof simples.update !== "undefined") {
			if(!simples.update.isFirstChange()){
				debugger;
				let newQuestion : QuestionBase<any>[] = this.questions.filter(x=> !this.questions2display.includes(x));
				newQuestion.map(x=> x.required ? this.form.addControl(x.key || '', new FormControl(x.value || '', Validators.required)): this.form.addControl(x.key || '', new FormControl(x.value || '')) )
				newQuestion.map(x=>this.questions2display.push(x));
			}
		}

		
	}

	onSubmit() {
	//    this.payLoad = JSON.stringify(this.form.value);
	    this.saveForm.emit(this.form.value);
	}

}
