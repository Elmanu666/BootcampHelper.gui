import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { SessionComponent } from './session.component';
import { SessionListComponent } from './session-list/session-list.component';
import { SessionDisplayComponent } from './session-display/session-display.component';
import { SessionCreateComponent } from './session-create/session-create.component';
import { SessionRunComponent } from './session-run/session-run.component';
import { SessionMainComponent } from './session-main/session-main.component';

import { CanActivateExercisesGuard }     from '../guards/can-activate-exercises.guards';

const sessionRoutes: Routes = [
  {
    path: 'session',
    component: SessionComponent,
    //canActivate: [CanActivateExercisesGuard],
    children: [
          { path: '', component:SessionMainComponent},
          { path: 'list', component: SessionListComponent },
          { path: 'create', component: SessionCreateComponent },
          { path: 'detail/:id', component: SessionDisplayComponent },
          { path: 'detail', component: SessionListComponent },
          { path: 'edit/:id', component: SessionCreateComponent },
          { path: 'edit', component: SessionListComponent },
          { path: 'run/:id', component: SessionRunComponent },
          { path: 'run', component: SessionRunComponent },
//          { path: 'count-down', component: SessionRunComponent },

        
      
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(sessionRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class SessionRoutingModule {}