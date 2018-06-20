// https://medium.com/netscape/mean-app-tutorial-with-angular-4-part-1-18691663ea96


// 3thr party modules
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule, HttpHandler } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
//import { EditorModule } from '@tinymce/tinymce-angular';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatStepperModule, MatNativeDateModule, MatListModule, MatCardModule, MatInputModule, MatButtonModule, MatDatepickerModule, MatSelectModule, MatGridListModule, MatExpansionModule, MatIconModule} from '@angular/material';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';


import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { UiSwitchModule } from 'ngx-ui-switch';
import {ToastrModule} from 'ngx-toastr';




// Services 
import { ExerciseService } from './services/exercise.service';
import { PagerService } from './services/pages.service';
import { FileService } from './services/file.service';
import { authService } from './services/auth.service';
import { userService } from './services/user.service';
import { SessionService } from './services/session.service';
import { userSessionService } from './services/userSession.service';


//Guards
import { CanActivateExercisesGuard } from './guards/can-activate-exercises.guards';


//module 
import { AppRoutingModule } from './app-routing/app-routing.module';
import { ExerciseModule } from './exercise/exercise.module';



//Component
import { AppComponent } from './app.component';


//import { ExercisesComponent } from './exercise/exercises/exercises.component';
//import { ExerciseListComponent } from './exercise/exercise-list/exercise-list.component';


//import { FileUploadComponent } from './file-upload/file-upload.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { BootcampHelperHeaderComponent } from './bootcamp-helper-header/bootcamp-helper-header.component';
import { CountdownComponent } from './countdown/countdown.component';
import { SessionRunComponent } from './session-run/session-run.component';
import { loginComponent } from './login/login.component';

import { BchSsessionsComponent } from './bch-ssessions/bch-ssessions.component';
import { SessionListComponent } from "./session-list/session-list.component";
import { SessionDisplayComponent } from './session-display/session-display.component';
import { SessionComponent } from './session/session.component';




    
    

//import { AppComponent } from './app.component';




//import { SessionListComponent } from './session-list/session-list.component';





@NgModule({
  declarations: [
    AppComponent,
//    ExercisesComponent,
//    FileUploadComponent,
    PageNotFoundComponent,
    BootcampHelperHeaderComponent,
    CountdownComponent,
    SessionRunComponent,
    loginComponent,
    BchSsessionsComponent,
    SessionDisplayComponent,
    SessionListComponent,
    SessionComponent,
 //   SessionListComponent
  ],
  imports: [
 //   FileUploadComponent,
    ExerciseModule,
    AppRoutingModule,
//    SessionListComponent,
   
    BrowserModule,
    UiSwitchModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
//    EditorModule,
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
