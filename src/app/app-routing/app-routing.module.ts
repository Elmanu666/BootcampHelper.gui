import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { AppComponent } from "../app.component";
//import { ExerciseListComponent } from "../exercise/exercise-list/exercise-list.component";
//import { ExercisesComponent } from "../exercise/exercises/exercises.component";
import { SessionListComponent } from "../session-list/session-list.component";
import { SessionComponent } from "../session/session.component";
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
    

  // },    
  {
    path: 'count-down',
    component: SessionRunComponent
  },
  {
    path: 'sessions',
    component: BchSsessionsComponent,
    // children :[

    //     {
    //       path: ':id',
    //       component : SessionComponent,

    //     },
    //     {
    //       path: 'create',
    //       component : BchSsessionsComponent,

    //     },
    //     {
    //       path: 'list',
    //       component : SessionListComponent,

    //     },




    // ]


  },
  {
    path: 'session/list',
    component: SessionListComponent
  },
   {
    path: 'session/create',
    component: BchSsessionsComponent
  },


  {
    path: 'session/:id',
    component: SessionComponent
  },

  {
    path: 'sessions-list',
    component: SessionListComponent
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
