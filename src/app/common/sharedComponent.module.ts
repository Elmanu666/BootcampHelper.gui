import { NgModule }       from '@angular/core';
import { CommonModule } from '@angular/common';  
import { BrowserModule } from '@angular/platform-browser';
import { MenuBlocksComponent } from './menu-blocks/menuBlocks.component';
import { MenuComponent } from './menu/menu.component';
import { PagerComponent } from './pager/pager.component';
import { FileUploadComponent } from '../file-upload/file-upload.component';




@NgModule({
    imports: [
    CommonModule,
    BrowserModule
        
     ],
    declarations: [
         MenuBlocksComponent,
         MenuComponent,
         PagerComponent,
         FileUploadComponent

    ],
    exports: [
        MenuBlocksComponent,
        MenuComponent,
        PagerComponent,
        FileUploadComponent

    ]
})
  
export class SharedModule {}