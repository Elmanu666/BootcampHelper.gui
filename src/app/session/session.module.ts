import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { EditorModule } from '@tinymce/tinymce-angular';
import { UiSwitchModule } from 'ngx-ui-switch';
import {MatStepperModule, MatNativeDateModule, MatListModule, MatCardModule, MatInputModule, MatButtonModule, MatDatepickerModule, MatSelectModule, MatGridListModule, MatExpansionModule, MatIconModule} from '@angular/material';




import { FormsModule } from '@angular/forms';


import {SessionDisplayComponent} from './session-display/session-display.component';
import {SessionListComponent} from './session-list/session-list.component';
import {SessionCreateComponent} from './session-create/session-create.component';
import {SessionRunComponent} from './session-run/session-run.component';
import {SessionSheetComponent} from './session-sheet/session-sheet.component';

import { CountdownComponent } from '../countdown/countdown.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { SessionRoutingModule } from './session-routing.module';





@NgModule({
  imports: [
//    NgModule,
    UiSwitchModule,
    CommonModule,
    FormsModule,
    EditorModule,
    MatStepperModule,
    MatNativeDateModule,
    MatListModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatSelectModule,
    MatGridListModule,
    MatExpansionModule,
    MatIconModule,
    NgbModule,
    SessionRoutingModule,

    
    
  ],
  declarations: [
  	SessionDisplayComponent,
  	SessionListComponent,
  	SessionCreateComponent,
  	SessionRunComponent,
  	CountdownComponent,
  	SessionSheetComponent,

  ],

  exports : [CountdownComponent],



  providers: [],

})
export class SessionModule {}