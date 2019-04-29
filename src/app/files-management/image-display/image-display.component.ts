import { Component, OnInit, Input } from '@angular/core';
import { FileService } from '../services/file.service';
import File from '../models/file.model';
import { environment } from '../../../environments/environment';




@Component({
  selector: 'app-image-display',
  templateUrl: './image-display.component.html',
  styleUrls: ['./image-display.component.scss']
})
export class ImageDisplayComponent implements OnInit {


	@Input() objectId: string ;
	@Input() style: string ;

	images : File[];
	ready : boolean;
	img_url = environment.imgUrl || 'http://localhost:3000/';


  	constructor(
    	private fileService : FileService,
	) { }

  	ngOnInit() {
  		console.log(this.objectId, this.style);

  		this.style = this.style || 'none';

  		this.ready = false
  		this.objectId ? this.getImage() : this.ready = true;
  		
  	}


	getImage(){
		this.fileService.getImages(this.objectId)
		.subscribe(retApi => {
			debugger;
		        //assign the todolist property to the proper http response
		        this.images = retApi.data.docs;
		        console.log(this.images.length);
		        this.ready =true;
		      })
	 }

	removeImage(img){
		this.ready = false;
	    this.fileService.deleteImage(img._id)
	    .subscribe(retApi => {
	            //assign the todolist property to the proper http response
	           this.images =  this.images.filter( imgs => {

	              return imgs._id !== img._id;
	              this.ready = true;
	            })


	          })

	  }

	  refresh(){
	  	this.ready=false;
	  	this.getImage()

	  }

}
