import { Component, OnInit, Input, Output, ViewChild  } from '@angular/core';
// import { FileUploadComponent  } from '../file-upload/file-upload.component';
import { ImageDisplayComponent  } from '../image-display/image-display.component';

@Component({
  selector: 'app-files-management',
  templateUrl: './files-management.component.html',
  styleUrls: ['./files-management.component.scss']
})
export class FilesManagementComponent implements OnInit {

	@Input() display : boolean;
	@Input() upload : boolean;
	@Input() edit : boolean;
	@Input() objectId : string;
	@Input() theme : string;


	@ViewChild(ImageDisplayComponent, { static: false }) imagedisplaycomponent: ImageDisplayComponent;

	private style : string;

	constructor() { }

	ngOnInit() {

		this.style = this.theme || 'none';
		console.log(this.display, this.upload, this.objectId, this.style, this.theme);

	}

	updateImage(event){

		this.imagedisplaycomponent.refresh();

	}

}
