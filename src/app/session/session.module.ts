import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { EditorModule } from '@tinymce/tinymce-angular';
import { UiSwitchModule } from 'ngx-ui-switch';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTooltipModule } from '@angular/material/tooltip';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

import {FilesManagementModule} from '../files-management/files-management.module';


import { FormsModule } from '@angular/forms';


import {SessionDisplayComponent} from './session-display/session-display.component';
import {SessionListComponent} from './session-list/session-list.component';
import {SessionCreateComponent} from './session-create/session-create.component';
import {SessionRunComponent} from './session-run/session-run.component';
import {SessionSheetComponent} from './session-sheet/session-sheet.component';
import {SessionMainComponent} from './session-main/session-main.component';
import {SessionComponent} from './session.component';

import { CountdownComponent } from '../countdown/countdown.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { SessionRoutingModule } from './session-routing.module';

import { EscapeHtmlPipe } from '../pipes/keep-html.pipe';

import {SharedModule} from '../common/sharedComponent.module'
// import { CalendarModule, DateAdapter } from 'angular-calendar';
// import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { CalendarComponent } from '../calendar/calendar.component';

import { DraggableModule } from '../common/draggable/draggable.module';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { bchTooltipModule } from '../tooltip/bch-tooltip.module';
import { SessionEndComponent } from './session-end/session-end.component'

import {DynamicFormModule} from '../dynamic-form/dynamic-form.module';
import { SessionUsersSelectionComponent } from './session-users-selection/session-users-selection.component';
import { SessionUsersSelectionModalComponent } from './session-users-selection/session-users-selection.component';

import { RoundComponent } from '../round/round.component';







// import { MenuBlocksComponent } from '../common/menu-blocks/menuBlocks.component';
// import { MenuComponent } from '../common/menu/menu.component';







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
    SharedModule,
    DraggableModule,
    DragDropModule,
    bchTooltipModule,
    DynamicFormModule,

  ],

  declarations: [
    SessionComponent,
  	SessionDisplayComponent,
  	SessionListComponent,
  	SessionCreateComponent,
    SessionRunComponent,
  	SessionMainComponent,
  	CountdownComponent,
  	SessionSheetComponent,
    EscapeHtmlPipe,
    CalendarComponent,
    SessionEndComponent,
    SessionUsersSelectionComponent,
    SessionUsersSelectionModalComponent,
    RoundComponent

  ],

  entryComponents: [
    SessionUsersSelectionComponent,
    SessionUsersSelectionModalComponent,
    RoundComponent
  ],


  exports : [CountdownComponent],



  providers: [],

})
export class SessionModule {}