import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { UsersListComponent } from './users-list/users-list.component';
import { UsersCreateComponent } from './users-create/users-create.component';
import { UserComponent } from './user/user.component';
import { UsersRoutingModule } from './users-routing.module';

import {SharedModule} from '../common/sharedComponent.module';
import {DynamicFormModule} from '../dynamic-form/dynamic-form.module';
import { UserMainComponent } from './user-main/user-main.component'




@NgModule({
  imports: [
    CommonModule,
    UsersRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    DynamicFormModule
  ],
  declarations: [ UsersListComponent, UsersCreateComponent, UserComponent, UserMainComponent ]
})
export class UsersModule { }
