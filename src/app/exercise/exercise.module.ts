import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { EditorModule } from '@tinymce/tinymce-angular';
import { UiSwitchModule } from 'ngx-ui-switch';




import { FormsModule } from '@angular/forms';


import { ExerciseListComponent} from './exercise-list/exercise-list.component';

import { ExerciseComponent} from './exercise.component';
import { ExerciseCreateComponent} from './exercise-create/exercise-create.component';
import { ExerciseMainComponent} from './exercise-main/exercise-main.component';



import { ExerciseRoutingModule } from './exercise-routing.module';

import { ExerciseTitleFilter } from '../pipes/exerciseTitleFilter.pipe';
//import { PagerComponent } from '../common/pager/pager.component';

import {MatSliderModule} from '@angular/material/slider';

import {SharedModule} from '../common/sharedComponent.module'
import {FilesManagementModule} from '../files-management/files-management.module'

import { ReactiveFormsModule } from '@angular/forms';

import {DynamicFormModule} from '../dynamic-form/dynamic-form.module';
import { bchTooltipModule } from '../tooltip/bch-tooltip.module'


import { FontAwesomeModule, FaIconLibrary, FaConfig } from '@fortawesome/angular-fontawesome';
import { faEdit, faTrashAlt, faEye } from '@fortawesome/free-solid-svg-icons';
import { faEdit as farEdit } from '@fortawesome/free-regular-svg-icons';




// import { AdminComponent }           from './admin.component';
// import { AdminDashboardComponent }  from './admin-dashboard.component';
// import { ManageCrisesComponent }    from './manage-crises.component';
// import { ManageHeroesComponent }    from './manage-heroes.component';

// import { AdminRoutingModule }       from './admin-routing.module';

@NgModule({
  imports: [
//    NgModule,
    UiSwitchModule,
    CommonModule,
    FormsModule,
    EditorModule,
    ExerciseRoutingModule,
    MatSliderModule,
    SharedModule,
    FilesManagementModule,
    ReactiveFormsModule,
    DynamicFormModule,
    bchTooltipModule,
    FontAwesomeModule
  ],
  declarations: [
    ExerciseListComponent,
    ExerciseComponent,
    ExerciseCreateComponent,
    ExerciseMainComponent,
    ExerciseTitleFilter,
 //   PagerComponent,


  ],

})
export class ExerciseModule {

  constructor(library: FaIconLibrary, faConfig: FaConfig) {
    // Add an icon to the library for convenient access in other components
    library.addIcons(farEdit, faTrashAlt,faEye);

//    faConfig.defaultPrefix = 'far';
  }
}