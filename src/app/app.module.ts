// https://medium.com/netscape/mean-app-tutorial-with-angular-4-part-1-18691663ea96


// 3thr party modules
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule, HttpHandler } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
//import { EditorModule } from '@tinymce/tinymce-angular';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatTooltipModule, MatStepperModule, MatNativeDateModule, MatListModule, MatCardModule, MatInputModule, MatButtonModule, MatDatepickerModule, MatSelectModule, MatGridListModule, MatExpansionModule, MatIconModule} from '@angular/material';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { OverlayModule } from '@angular/cdk/overlay';

import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { UiSwitchModule } from 'ngx-ui-switch';
import {ToastrModule} from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';





// Services 
import { ExerciseService } from './services/exercise.service';
import { PagerService } from './services/pages.service';

import { authService } from './services/auth.service';
import { UserService } from './services/user.service';
import { SessionService } from './services/session.service';
import { userSessionService } from './services/userSession.service';
import { MaterialTypeService } from './services/materialType.service';
import { BodyPartService } from './services/bodyPart.service';
import { MenuService } from './services/menu.service';
import { MaterialService } from './services/material.service';
import { errorHandler } from './services/errorHandler.service';
import { CaloriesBurntService } from './services/caloriesBurnt.service';
import { SportService } from './services/sport.service';



//Guards
import { CanActivateExercisesGuard } from './guards/can-activate-exercises.guards';


//module 
import { AppRoutingModule } from './app-routing.module';
import { ExerciseModule } from './exercise/exercise.module';
import { SessionModule } from './session/session.module';
import { MaterialModule } from './material/material.module';
import { UsersModule } from './users/users.module';
import { SharedModule } from './common/sharedComponent.module'
import { FilesManagementModule } from './files-management/files-management.module'

        


//Component
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { BootcampHelperHeaderComponent } from './bootcamp-helper-header/bootcamp-helper-header.component';

import { loginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';


//import { SessionComponent } from './session/session.component';

//pipe
import {CapitalizePipe} from "./pipes/capitalize.pipe";
//import { RoundComponent } from './round/round.component';












@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    BootcampHelperHeaderComponent,
    HomeComponent,
    loginComponent,
//    SessionComponent,
    CapitalizePipe,


  ],



  imports: [
    SessionModule,
    ExerciseModule,
    MaterialModule,
    UsersModule,
    AppRoutingModule,
    BrowserModule,
    UiSwitchModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
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
    SharedModule,
    FilesManagementModule,
    NgxSpinnerModule,
    OverlayModule,
    NgbModule.forRoot(),
    ToastrModule.forRoot(),
  ],


  exports:[             

    ],

  providers: [errorHandler, MenuService, SportService, MaterialService, ExerciseService,  PagerService, authService, UserService, userSessionService, SessionService, CanActivateExercisesGuard, MaterialTypeService, BodyPartService, CaloriesBurntService],
  bootstrap: [AppComponent]
})
export class AppModule { }
