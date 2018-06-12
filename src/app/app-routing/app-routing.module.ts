import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { AppComponent } from "../app.component";
import { ExerciseListComponent } from "../exercise-list/exercise-list.component";
import { ExercisesComponent } from "../exercises/exercises.component";
import { SessionListComponent } from "../session-list/session-list.component";
import { SessionRunComponent } from "../session-run/session-run.component";
import { loginComponent } from "../login/login.component";
import { PageNotFoundComponent } from "../page-not-found/page-not-found.component";
import { BchSsessionsComponent } from "../bch-ssessions/bch-ssessions.component";
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
  {
    path: 'exercises',
    component: ExercisesComponent,
    canActivate: [
      CanActivateExercisesGuard
    ],
  },
  {
    path: 'exercise',
    component: ExercisesComponent,

  },    
  {
    path: 'count-down',
    component: SessionRunComponent
  },
  {
    path: 'sessions',
    component: BchSsessionsComponent
  },
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
