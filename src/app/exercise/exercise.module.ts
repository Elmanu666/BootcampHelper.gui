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

import { FileUploadComponent } from '../file-upload/file-upload.component';


import { ExerciseRoutingModule } from './exercise-routing.module';

import { ExerciseTitleFilter } from '../pipes/exerciseTitleFilter.pipe';
import { PagerComponent } from '../common/pager/pager.component';

import {MatSliderModule} from '@angular/material/slider';



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
    MatSliderModule
    
  ],
  declarations: [
    ExerciseListComponent,
    ExercisesComponent,
    FileUploadComponent,
    ExerciseComponent,
    ExerciseDisplayComponent,
    ExerciseCreateComponent,
    ExerciseTitleFilter,
    PagerComponent,

  ],

})
export class ExerciseModule {}