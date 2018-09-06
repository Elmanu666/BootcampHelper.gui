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
import { MaterialViewComponent } from './material-view/material-view.component';

import {SharedModule} from '../common/sharedComponent.module'
import { ReactiveFormsModule } from '@angular/forms';
import { IonRangeSliderModule } from "ng2-ion-range-slider";










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
    IonRangeSliderModule,
    ReactiveFormsModule

 
    
  ],
  declarations: [

   MaterialComponent,
   MaterialMainComponent,
   MaterialListComponent,
   MaterialCreateComponent,
   MaterialViewComponent


  ],

})
export class MaterialModule {}