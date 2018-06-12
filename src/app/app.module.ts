// https://medium.com/netscape/mean-app-tutorial-with-angular-4-part-1-18691663ea96

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule, HttpHandler } from '@angular/common/http';
import { ExerciseService } from './services/exercise.service';
import { PagerService } from './services/pages.service';
import { FileService } from './services/file.service';
import { authService } from './services/auth.service';
import { userService } from './services/user.service';
import { SessionService } from './services/session.service';
import { userSessionService } from './services/userSession.service';
import { CanActivateExercisesGuard } from './guards/can-activate-exercises.guards';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { EditorModule } from '@tinymce/tinymce-angular';

import { AngularFontAwesomeModule } from 'angular-font-awesome';


//module for a switch button
import { UiSwitchModule } from 'ngx-ui-switch';


import {ToastrModule} from 'ngx-toastr';


import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing/app-routing.module';
import { AppComponent } from './app.component';

    
    

//import { AppComponent } from './app.component';
import { ExercisesComponent } from './exercises/exercises.component';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { FileUploadComponent } from './file-upload/file-upload.component';

import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { BootcampHelperHeaderComponent } from './bootcamp-helper-header/bootcamp-helper-header.component';
import { CountdownComponent } from './countdown/countdown.component';
import { SessionRunComponent } from './session-run/session-run.component';
import { loginComponent } from './login/login.component';
import { BchSsessionsComponent } from './bch-ssessions/bch-ssessions.component';

import {MatStepperModule, MatNativeDateModule, MatListModule, MatCardModule, MatInputModule, MatButtonModule, MatDatepickerModule, MatSelectModule, MatGridListModule, MatExpansionModule, MatIconModule} from '@angular/material';
import { SessionDisplayComponent } from './session-display/session-display.component';
//import { SessionListComponent } from './session-list/session-list.component';



import { ExerciseListComponent } from './exercise-list/exercise-list.component';


@NgModule({
  declarations: [
    AppComponent,
    ExercisesComponent,
    FileUploadComponent,
    PageNotFoundComponent,
    BootcampHelperHeaderComponent,
    CountdownComponent,
    SessionRunComponent,
    loginComponent,
    BchSsessionsComponent,
    SessionDisplayComponent,
 //   SessionListComponent
  ],
  imports: [
    AppRoutingModule,
//    SessionListComponent,
   
    BrowserModule,
    UiSwitchModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    EditorModule,
    AngularFontAwesomeModule,
    MatIconModule,
 	  MatStepperModule,
 	  MatInputModule,
 	  MatDatepickerModule,
 	  MatButtonModule, 
 	  MatNativeDateModule,
 	  MatGridListModule,
 	  MatSelectModule,
 	  MatExpansionModule,
     MatListModule,
     MatCardModule,
    NgbModule.forRoot(),
    ToastrModule.forRoot(),
  ],
  providers: [ExerciseService, PagerService, FileService, authService, userService, userSessionService, SessionService, CanActivateExercisesGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
