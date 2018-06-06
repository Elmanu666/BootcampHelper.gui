// https://medium.com/netscape/mean-app-tutorial-with-angular-4-part-1-18691663ea96

import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule, HttpHandler } from '@angular/common/http';
import { ExerciseService } from './services/exercise.service';
import { PagerService } from './services/pages.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { EditorModule } from '@tinymce/tinymce-angular';
//module for a switch button
import { UiSwitchModule } from 'ngx-ui-switch';



import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing/app-routing.module';

import {
    ToastrModule } from 'ngx-toastr';
    
    

import { AppComponent } from './app.component';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { SessionListComponent } from './session-list/session-list.component';
import { ExerciseListComponent } from './exercise-list/exercise-list.component';


@NgModule({
  declarations: [
    AppComponent,
    SessionListComponent,
    ExerciseListComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    UiSwitchModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    EditorModule,
    NgbModule.forRoot(),
    ToastrModule.forRoot(),
  ],
  providers: [ExerciseService, PagerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
