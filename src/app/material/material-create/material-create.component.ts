import { Response } from '@angular/http';
import { MaterialService } from '../../services/material.service';
import { MaterialTypeService } from '../../services/materialType.service';
import Material from '../../models/material.model';
import File from '../../models/file.model';
import { Component, OnInit} from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { FileService } from '../../services/file.service';
import {ReactiveFormsModule, FormsModule, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';


@Component({
  selector: 'bth-material-create',
  templateUrl: './material-create.component.html',
  styleUrls: ['./material-create.component.scss'],
 

})
export class MaterialCreateComponent {


	id:string;
	material:Material;
	materialSize : Array<string>;
	images:File;
	ready:boolean;
	materialType:Array<string>;
	materialForm:FormGroup;
	view : boolean;
	path : string;

	title; type; description; weigth; size; quantity; strength;length :FormControl


	



	constructor(
		private toastr : ToastrService,
		private route: ActivatedRoute,
		private materialService : MaterialService,
		private fileService : FileService,
		private materialTypeService : MaterialTypeService,
		private router : Router,
	){




	}

	onSubmit(){

		if (this.path == 'create'){

			this.create();
		}
		else if (this.path == 'edit'){

			this.update();
		}




	}


	create() {
	    this.materialService.createMaterial(this.materialForm.value)
	      .subscribe((res) => {
	        this.material = res.data;
	        this.toastr.success('Creation succesful', 'Success!' , {timeOut: 2000});
	        this.id = this.material._id;
	        this.router.navigate(['material/edit/'+this.id])
	      })

  }

  	update() {

	       this.materialService.editMaterial(this.materialForm.value).subscribe(res => {
	          console.log('Update Succesful')
	          this.toastr.success('Update succesful', 'Success!' , {timeOut: 2000});

	        }, err => {

	          this.toastr.error('Update Unsuccesful', 'Error!' , {timeOut: 2000});
	        })
  }

	ngOnInit(): void{
		

			this.route.snapshot.routeConfig.path.slice(0,6) == 'detail' ? this.view = true: this.view = false;
			this.path = this.route.snapshot.routeConfig.path.split("/")[0];
		 	this.materialSize=['XXS','XS','S', 'M', 'L', 'XL', 'XXL'];
		 	this.materialType=this.materialTypeService.getMaterialType();
		  	this.route.snapshot.paramMap.get('id') ? this.id =  this.route.snapshot.paramMap.get('id') : this.id = null;
		  	
		  	if (this.id == null){

		  		this.material = new Material();
		  		this.createFormControls();
		  		this.formInit();
		  		this.ready = true;

		  	}

		  	else {

		  		this.materialService.getMaterial(this.id)
		  		.subscribe(
		  			material => {

	        			this.material = material;
	        			this.createFormControls();
	        			this.formInit();       
	        			this.getImage(this.material._id);
	        			this.ready=true;
      				})
		  			error => {
		  				console.log(error);

		  			}
		  	}
	}



	createFormControls(){
		this.title = new FormControl({value:this.material.title, disabled:this.view}, [Validators.required, Validators.minLength(5)]);
		this.type = new FormControl({value:this.material.type, disabled: this.view}, Validators.required);
		this.description = new FormControl({value:this.material.description, disabled: this.view}, Validators.required);
		this.weigth = new FormControl({value:this.material.weigth, disabled: this.view});
		this.length = new FormControl({value:this.material.length, disabled: this.view});
		this.size = new FormControl({value:this.material.size, disabled: this.view});
		this.strength = new FormControl({value:this.material.strength, disabled: this.view});
		this.quantity = new FormControl({value:this.material.quantity, disabled: this.view}, Validators.required);
	}


	formInit(){

	  	this.materialForm = new FormGroup({
	        title: this.title,
	        type : this.type,
	        description : this.description,
	        weigth : this.weigth,
	        length : this.length,
	        size : this.size,
	        quantity : this.quantity,
	        strength : this.strength,
	    });
		

	}

	getImage(id){
    	this.fileService.getImages(id)
    	.subscribe(retApi => {
            //assign the todolist property to the proper http response
            this.images = retApi.data.docs;
            console.log('retour api image' +id);
            console.log(this.images)
            



          })
     }


}