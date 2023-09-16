import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserprofileComponent } from './userprofile/userprofile.component';
import { CorporatedetailsComponent } from './corporatedetails/corporatedetails.component';
import { Routes } from '@angular/router';
import { EdituserComponent } from './edituser/edituser.component';
import { FormsModule } from '@angular/forms';

export const userRoutes:Routes=[
  {path:'userinfo',component:UserprofileComponent},
  {path:'changeprofile',component:EdituserComponent},

]

@NgModule({
  declarations: [
    UserprofileComponent,
    CorporatedetailsComponent,
    EdituserComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
  ]
})
export class UsersModule { }
