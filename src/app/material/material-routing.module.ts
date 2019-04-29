import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MaterialComponent } from './material.component';
import { MaterialMainComponent } from './material-main/material-main.component';
import { MaterialListComponent } from './material-list/material-list.component';
import { MaterialCreateComponent } from './material-create/material-create.component';


import { CanActivateExercisesGuard }     from '../guards/can-activate-exercises.guards';

const materialRoutes: Routes = [
  {
    path: 'material',
    component: MaterialComponent,
//    canActivate: [CanActivateExercisesGuard],
    children: [
      

          { path: '', component: MaterialMainComponent },
          { path: 'list', component: MaterialListComponent },
          { path: 'create', component: MaterialCreateComponent },
          { path: 'detail', component: MaterialListComponent },
          { path: 'detail/:id', component: MaterialCreateComponent },
          { path: 'edit', component: MaterialListComponent },
          { path: 'edit/:id', component: MaterialCreateComponent },



        
      
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(materialRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class MaterialRoutingModule {}


/*
Copyright 2017-2018 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/