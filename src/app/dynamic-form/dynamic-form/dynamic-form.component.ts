import { Component, Input, OnInit, Output, EventEmitter }  from '@angular/core';
import { FormGroup }                 from '@angular/forms';

import { QuestionBase }              from '../models/question-base.model';
import { QuestionService }    from '../question.service';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss'],
  providers: [ QuestionService ]
})
export class DynamicFormComponent implements OnInit {

	@Input() questions: QuestionBase<any>[] = [];
	@Input() disable: boolean;
	form: FormGroup;
	payLoad = '';
	@Output() saveForm = new EventEmitter();

	constructor(private qcs: QuestionService) { }

	ngOnInit() {
		
		typeof this.disable != undefined ? this.disable : this.disable = false ;
		this.form = this.qcs.toFormGroup(this.questions);
		this.disable == true ? this.form.disable() : '';
	}

	onSubmit() {
	//    this.payLoad = JSON.stringify(this.form.value);
	    this.saveForm.emit(this.form.value);
	}

}
