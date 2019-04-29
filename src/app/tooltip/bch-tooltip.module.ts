import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { bchTooltipComponent } from './bch-tooltip.component'
import { bchTooltipDirective } from './bch-tooltip.directive'

import { ImageDisplayComponent } from '../files-management/image-display/image-display.component';
import { FilesManagementComponent } from '../files-management/files-management/files-management.component';



@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    
    
  ],
  declarations: [
    bchTooltipComponent,
    bchTooltipDirective,
    
    ],
  exports: [
    bchTooltipComponent,
    bchTooltipDirective
    ],
  entryComponents: [
    FilesManagementComponent,
    ImageDisplayComponent,
    bchTooltipComponent
    ],
  providers :[

  	]  
})
export class bchTooltipModule { }
