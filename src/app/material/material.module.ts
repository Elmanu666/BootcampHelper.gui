import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { EditorModule } from '@tinymce/tinymce-angular';
import { UiSwitchModule } from 'ngx-ui-switch';
import {MatSliderModule} from '@angular/material/slider';



import { MaterialRoutingModule } from './material-routing.module';

import { MaterialComponent } from './material.component';
import { MaterialMainComponent } from './material-main/material-main.component';
import { MaterialListComponent } from './material-list/material-list.component';
import { MaterialCreateComponent } from './material-create/material-create.component';

import {SharedModule} from '../common/sharedComponent.module'
import {FilesManagementModule} from '../files-management/files-management.module'
import { ReactiveFormsModule } from '@angular/forms';
//import { IonRangeSliderModule } from "ng2-ion-range-slider";
import { NgxSliderModule } from '@m0t0r/ngx-slider';











@NgModule({
  imports: [
//    NgModule,
//	NgModule,

    MaterialRoutingModule,
    SharedModule,
    CommonModule,
 //   FormsModule,
    UiSwitchModule,
    MatSliderModule,
 //   IonRangeSliderModule,
    NgxSliderModule,
    ReactiveFormsModule,
    FilesManagementModule,

 
    
  ],
  declarations: [

   MaterialComponent,
   MaterialMainComponent,
   MaterialListComponent,
   MaterialCreateComponent,


  ],

})
export class MaterialModule {}