import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisteruserComponent } from './registeruser/registeruser.component';
import { Routes } from '@angular/router';

export const membershipRoutes: Routes = [
  {path:'user/register/:id',component:RegisteruserComponent},
]


@NgModule({
  declarations: [
    RegisteruserComponent
  ],
  imports: [
    CommonModule
  ]
})
export class MembershipModule { }
