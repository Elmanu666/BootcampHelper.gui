import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExerciseComponent } from './exercise/exercise.component';
import { SessionRunComponent } from './session-run/session-run.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { loginComponent } from './login/login.component';
import { CanActivateExercisesGuard } from './guards/can-activate-exercises.guards';
import { BchSsessionsComponent } from './bch-ssessions/bch-ssessions.component';


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
  //   component: ExerciseComponent,
  //   canActivate: [
  //     CanActivateExercisesGuard
  //   ],
  // },
  // {
  //   path: 'exercise',
  //   component: ExerciseComponent,

  // },    
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
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule {
}