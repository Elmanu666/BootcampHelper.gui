//http://www.advancesharp.com/blog/1218/angular-4-upload-files-with-data-and-web-api-by-drag-drop


import { Component, OnInit, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { FileService } from '../services/file.service';


@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {

	errors: Array<string> =[];
	dragAreaClass: string = 'dragarea';
	@Input() ExerciseId: string = "0";
	@Input() type: string ="";
	@Input() fileExt: string = "JPG, GIF, PNG";
	@Input() maxFiles: number = 5;
	@Input() maxSize: number = 5; // 5MB
	@Output() uploadStatus = new EventEmitter();


  constructor(private fileService: FileService) { }

  ngOnInit() {
  }



	onFileChange(event){
	   let files = event.target.files; 
	   this.saveFiles(files);
	}

	@HostListener('dragover', ['$event']) onDragOver(event) {
	    this.dragAreaClass = "droparea";
	    event.preventDefault();
	}

	@HostListener('dragenter', ['$event']) onDragEnter(event) {
	    this.dragAreaClass = "droparea";
	    event.preventDefault();
	}

	@HostListener('dragend', ['$event']) onDragEnd(event) {
	    this.dragAreaClass = "dragarea";
	    event.preventDefault();
	}

	@HostListener('dragleave', ['$event']) onDragLeave(event) {
	    this.dragAreaClass = "dragarea";
	    event.preventDefault();
	}

	@HostListener('drop', ['$event']) onDrop(event) {   
	    this.dragAreaClass = "dragarea";           
	    event.preventDefault();
	    event.stopPropagation();
	    var data = event.dataTransfer.items;
	 

	    for (var v = 0 ; v < data.length; v++){

	    	if (data[v].kind == 'string' && data[v].type.match('^text/uri-list')) 
	    		{
     			data[v].getAsString(s =>{

     				var f = s;
     				this.fileService.getHttpImages(f)
     					.subscribe(files =>{
							var fl = new Array();
							files.name = f;
							files.lastModifiedDate = new Date();

							fl.push(files);
     						console.log(fl);
     						this.saveFiles(fl)

     					})
     				
     			});
     			console.log("... Drop: URI");
   				}
   			else if (data[v].kind == 'file'){

   				var f = data[v].getAsFile();
   				var files = event.dataTransfer.files;
   				this.saveFiles(files);
   			}

	    }
	    
	}

	saveFiles(files){
	  this.errors = []; // Clear error
	  // Validate file size and allowed extensions
	  if (files.length > 0 && (!this.isValidFiles(files))) {
	      this.uploadStatus.emit(false);
	      return;
	  }       
	  if (files.length > 0) {
	        let formData: FormData = new FormData();


	         formData.append('exerciseId' , this.ExerciseId);
	         formData.append('type' , this.type);
	        
	        for (var j = 0; j < files.length; j++) {

	        
	//            formData.append("filename", 'test');
	            formData.append("file", files[j], files[j].name);
	        }

	        this.fileService.upload(formData)
	            .subscribe(
	            success => {
	              this.uploadStatus.emit(true);
	              console.log(success)
	            },
	            error => {
	                this.uploadStatus.emit(true);
	                this.errors.push(error.ExceptionMessage);
	            }) 
	    } 
	}

	private isValidFiles(files){
   // Check Number of files
	    if (files.length > this.maxFiles) {
	        this.errors.push("Error: At a time you can upload only " + this.maxFiles + " files");
	        return;
	    	}        
	    this.isValidFileExtension(files);
	    return this.errors.length === 0;
	}

	private isValidFileExtension(files){
  // Make array of file extensions
	  var extensions = (this.fileExt.split(','))
	                  .map(function (x) { return x.toLocaleUpperCase().trim() });
	  for (var i = 0; i < files.length; i++) {
	      // Get file extension
	      var ext = files[i].name.toUpperCase().split('.').pop() || files[i].name;
	      // Check the extension exists
	      var exists = extensions.includes(ext);
	      if (!exists) {
	          this.errors.push("Error (Extension): " + files[i].name);
	      }
	      // Check file size
	      this.isValidFileSize(files[i]);
	  }
	}

	private isValidFileSize(file) {
	      var fileSizeinMB = file.size / (1024 * 1000);
	      var size = Math.round(fileSizeinMB * 100) / 100; // convert upto 2 decimal place
	      if (size > this.maxSize)
	          this.errors.push("Error (File Size): " + file.name + ": exceed file size limit of " + this.maxSize + "MB ( " + size + "MB )");
	}



}
