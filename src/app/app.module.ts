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


import {ToastModule} from 'ng2-toastr/ng2-toastr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';



import { AppComponent } from './app.component';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    UiSwitchModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    EditorModule,
    NgbModule.forRoot(),
    ToastModule.forRoot()
  ],
  providers: [ExerciseService, PagerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
