import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageDisplayComponent } from './image-display/image-display.component'
import { FileUploadComponent } from './file-upload/file-upload.component';
import { FilesManagementComponent } from './files-management/files-management.component';
import {FileService} from './services/file.service';


@NgModule({
  declarations: [
  	FilesManagementComponent,  	
  	ImageDisplayComponent,
    FileUploadComponent
    ],
  imports: [
    CommonModule,

  ],
  exports: [
   	FilesManagementComponent,  	
  	ImageDisplayComponent,
    FileUploadComponent
    ],
  providers:[
  	FileService
   ]    

})
export class FilesManagementModule { }
