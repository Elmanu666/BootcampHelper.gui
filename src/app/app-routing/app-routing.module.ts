import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { AppComponent } from "../app.component";
import { ExerciseListComponent } from "../exercise-list/exercise-list.component";
import { SessionListComponent } from "../session-list/session-list.component";

const appRoutes: Routes = [
  {
    path: "exercises",
    component: ExerciseListComponent
  },  
  {
    path: "sessions",
    component: SessionListComponent
  },
   {
    path: "",
    redirectTo: "/exercises",
    pathMatch: "full"
  }
];


@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports : [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
