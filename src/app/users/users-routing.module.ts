import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { UserComponent } from './user/user.component';
import { UserMainComponent } from './user-main/user-main.component';
import { UsersListComponent } from './users-list/users-list.component';
import { UsersCreateComponent } from './users-create/users-create.component';


import { CanActivateExercisesGuard }     from '../guards/can-activate-exercises.guards';

const usersRoutes: Routes = [
  {
    path: 'user',
    component: UserComponent,
    //canActivate: [CanActivateExercisesGuard],
    children: [
          { path: '', component:UserMainComponent},
          { path: 'list', component: UsersListComponent },
          { path: 'create', component: UsersCreateComponent },
           { path: 'detail/:id', component: UsersCreateComponent },
          { path: 'detail', component: UsersListComponent },
           { path: 'edit/:id', component: UsersCreateComponent },
          { path: 'edit', component: UsersListComponent },


        
      
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(usersRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class UsersRoutingModule {}