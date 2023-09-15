import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserprofileComponent } from './userprofile/userprofile.component';
import { CorporatedetailsComponent } from './corporatedetails/corporatedetails.component';
import { Routes } from '@angular/router';

export const userRoutes:Routes=[
  {path:'userinfo',component:UserprofileComponent},
]

@NgModule({
  declarations: [
    UserprofileComponent,
    CorporatedetailsComponent
  ],
  imports: [
    CommonModule
  ]
})
export class UsersModule { }
