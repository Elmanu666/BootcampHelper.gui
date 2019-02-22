import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { EditorModule } from '@tinymce/tinymce-angular';
import { UiSwitchModule } from 'ngx-ui-switch';




import { FormsModule } from '@angular/forms';


import { ExerciseListComponent} from './exercise-list/exercise-list.component';
import { ExercisesComponent} from './exercises/exercises.component';
import { ExerciseComponent} from './exercise.component';
import { ExerciseDisplayComponent} from './exercise-display/exercise-display.component';
import { ExerciseCreateComponent} from './exercise-create/exercise-create.component';
import { ExerciseMainComponent} from './exercise-main/exercise-main.component';



import { ExerciseRoutingModule } from './exercise-routing.module';

import { ExerciseTitleFilter } from '../pipes/exerciseTitleFilter.pipe';
//import { PagerComponent } from '../common/pager/pager.component';

import {MatSliderModule} from '@angular/material/slider';

import {SharedModule} from '../common/sharedComponent.module'

import { ReactiveFormsModule } from '@angular/forms';

import {DynamicFormModule} from '../dynamic-form/dynamic-form.module';





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
    ReactiveFormsModule,
    DynamicFormModule
  ],
  declarations: [
    ExerciseListComponent,
    ExercisesComponent,
    ExerciseComponent,
    ExerciseDisplayComponent,
    ExerciseCreateComponent,
    ExerciseMainComponent,
    ExerciseTitleFilter,
 //   PagerComponent,


  ],

})
export class ExerciseModule {}