import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { AppComponent } from "../app.component";
//import { ExerciseListComponent } from "../exercise/exercise-list/exercise-list.component";
//import { ExercisesComponent } from "../exercise/exercises/exercises.component";
import { loginComponent } from "../login/login.component";
import { PageNotFoundComponent } from "../page-not-found/page-not-found.component";
import { CanActivateExercisesGuard } from "../guards/can-activate-exercises.guards";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: loginComponent
  },
  // {
  //   path: 'exercises',
  //   component: ExercisesComponent
  //   // canActivate: [
  //   //   CanActivateExercisesGuard
  //   // ],
  // },
  // {
  //   path: 'exercise',
  //   loadChildren: 'app/exercise/exercise.module#ExerciseModule',
    


  {
    path: '**',
    component: PageNotFoundComponent
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports : [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
