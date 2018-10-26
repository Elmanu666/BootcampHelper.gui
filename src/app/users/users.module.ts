import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersListComponent } from './users-list/users-list.component';
import { UsersCreateComponent } from './users-create/users-create.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ UsersListComponent, UsersCreateComponent]
})
export class UsersModule { }
