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
    
    // CalendarModule.forRoot({
    //   provide: DateAdapter,
    //   useFactory: adapterFactory
    // })


    
    
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


  ],

  exports : [CountdownComponent],



  providers: [],

})
export class SessionModule {}