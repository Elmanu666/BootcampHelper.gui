import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ExercisesComponent } from './exercises/exercises.component';
import { ExerciseComponent } from './exercise.component';
import { ExerciseListComponent } from './exercise-list/exercise-list.component';
import { ExerciseDisplayComponent } from './exercise-display/exercise-display.component';
import { ExerciseCreateComponent } from './exercise-create/exercise-create.component';

import { CanActivateExercisesGuard }     from '../guards/can-activate-exercises.guards';

const exerciseRoutes: Routes = [
  {
    path: 'exercise',
    component: ExerciseComponent,
   // canActivate: [CanActivateExercisesGuard],
    children: [
      

          { path: 'list', component: ExercisesComponent },
          { path: 'list2', component: ExerciseListComponent },
          { path: 'list3', component: ExerciseComponent },
          { path: 'create', component: ExerciseCreateComponent },
          { path: 'detail/:id', component: ExerciseDisplayComponent },

        
      
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(exerciseRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class ExerciseRoutingModule {}


/*
Copyright 2017-2018 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/