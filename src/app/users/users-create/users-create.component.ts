import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';

import {ReactiveFormsModule, FormsModule, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { UserService } from '../../services/user.service';
import User from '../../models/user.model';

import {QuestionBase} from '../../dynamic-form/models/question-base.model';
import {DropdownQuestion} from '../../dynamic-form/models/question-dropdown.model';
import {TextboxQuestion} from '../../dynamic-form/models/question-textbox.model';
import {RangeSimpleQuestion} from '../../dynamic-form/models/question-range-simple.model';

@Component({
  selector: 'app-users-create',
  templateUrl: './users-create.component.html',
  styleUrls: ['./users-create.component.scss']
})
export class UsersCreateComponent implements OnInit {

  viewMode; ready : boolean;
  userForm : FormGroup;
  formGroup : any[];
  user: User;
  path ; id; payload : string;
  questionsUsers: QuestionBase<any>[];

  


  constructor(
	private toastr : ToastrService,
	private route: ActivatedRoute,

	private router : Router,
	private userService : UserService,

		) { }

  ngOnInit() {

  	this.ready=false;
  	this.route.snapshot.routeConfig.path.slice(0,6) == 'detail' ? this.viewMode = true: this.viewMode = false;
  	this.path = this.route.snapshot.routeConfig.path.split("/")[0];
  	this.route.snapshot.paramMap.get('id') ? this.id =  this.route.snapshot.paramMap.get('id') : this.id = null;


  	this.formGroup = new Array();


  if (this.id == null){
		this.user = new User();
		this.createFormControls();
		this.formInit();
		this.questionsUsers = this.UserToQuestions();
		this.ready = true;
	}

	else {

		this.userService.getUser(this.id)
		.subscribe(user => {
			this.user = user;
			this.createFormControls();
			this.formInit();
			this.questionsUsers = this.UserToQuestions();      
	//		this.getImage(this.user._id);
			this.ready=true;
			})
		}



  }

	createFormControls(){

		this.formGroup[0] = {label:'username', formcontrol : new FormControl({value:this.user.username, disabled:this.viewMode}, [Validators.required, Validators.minLength(5)])}
	  	this.formGroup[1] = {label:'password', formcontrol : new FormControl({value:this.user.password, disabled: this.viewMode}, Validators.required)}
	  	this.formGroup[2] = {label:'name', formcontrol : new FormControl({value:this.user.name, disabled: this.viewMode}, Validators.required)}
	  	this.formGroup[3] = {label:'familyName', formcontrol : new FormControl({value:this.user.familyName, disabled: this.viewMode})}
	  	this.formGroup[4] = {label:'dateOfBirth', formcontrol : new FormControl({value:this.user.dateOfBirth, disabled: this.viewMode})}
	  	this.formGroup[5] = {label:'sex', formcontrol : new FormControl({value:this.user.sex, disabled: this.viewMode})}
	  	this.formGroup[6] = {label:'weigth', formcontrol : new FormControl({value:this.user.weigth, disabled: this.viewMode})}
	  	this.formGroup[7] = {label:'height', formcontrol : new FormControl({value:this.user.height, disabled: this.viewMode}, Validators.required)}


	}


	formInit(){

	  	this.userForm = new FormGroup({
	        username: this.formGroup[0].formcontrol,
	        password : this.formGroup[1].formcontrol,
	        name : this.formGroup[2].formcontrol,
	        familyName : this.formGroup[3].formcontrol,
	        dateOfBirth : this.formGroup[4].formcontrol,
	        sex : this.formGroup[5].formcontrol,
	        weigth : this.formGroup[6].formcontrol,
	        height : this.formGroup[7].formcontrol,
	    });
	}

	userSave(user:any){

		this.userService.createUser(user)
		.subscribe(user => {
			this.user = user.data;
	        this.toastr.success('Creation succesful', 'Success!' , {timeOut: 2000});
	        this.id = this.user._id;
	        this.router.navigate(['user/edit/'+this.id])

			})


	}

	UserToQuestions(){

		let questions : QuestionBase<any>[] = [
			new TextboxQuestion({
        		key: this.formGroup[0].label,
        		label: this.formGroup[0].label,
        		value: this.user.username,
        		required: true,
        		order: 1
      			}),
			new TextboxQuestion({
        		key: this.formGroup[1].label,
        		label: this.formGroup[1].label,
        		value: this.user.password,
        		required: true,
        		type: 'password',
        		order: 2
      			}),
			new TextboxQuestion({
        		key: this.formGroup[2].label,
        		label: this.formGroup[2].label,
        		value: this.user.name,
        		required: true,
        		order: 3
      			}),
			new TextboxQuestion({
        		key: this.formGroup[3].label,
        		label: this.formGroup[3].label,
        		value: this.user.familyName,
        		required: true,
        		order: 4
      			}),

			new TextboxQuestion({
        		key: this.formGroup[4].label,
        		label: this.formGroup[4].label,
        		value: this.user.dateOfBirth,
        		required: true,
        		type: 'date',
        		order: 5
      			}),
			new DropdownQuestion({
        		key: this.formGroup[5].label,
        		label: this.formGroup[5].label,
        		value: this.user.sex,
        		options:[
        			{key: 'm', value:'male'},
        			{key: 'f', value:'female'}
        			],	
        		required: true,
        		order: 6
      			}),
			new RangeSimpleQuestion({
        		key: this.formGroup[6].label,
        		label: this.formGroup[6].label,
        		value: this.user.weigth,
        		required: true,
        		type: 'number',
        		order: 7,
        		options:
        			{min:30, max:150, step:5}
        			
      			}),
			new RangeSimpleQuestion({
        		key: this.formGroup[7].label,
        		label: this.formGroup[7].label,
        		value: this.user.height,
        		required: true,
        		type: 'number',
        		order: 8,
        		options:
        			{min:100, max:210, step:5}
        			
      			}),


		]

		return questions.sort((a, b)=> a.order - b.order);

	}
}
