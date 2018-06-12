import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { AppComponent } from "../app.component";
import { ExerciseListComponent } from "../exercise-list/exercise-list.component";
import { SessionListComponent } from "../session-list/session-list.component";

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
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports : [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
