import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserprofileComponent } from './userprofile/userprofile.component';
import { CorporatedetailsComponent } from './corporatedetails/corporatedetails.component';
import { RouterModule, Routes } from '@angular/router';
import { EdituserComponent } from './edituser/edituser.component';
import { FormsModule } from '@angular/forms';
import { UpdatepasswordComponent } from '../authentication/updatepassword/updatepassword.component';


export const userRoutes:Routes=[
  {path:'userinfo',component:UserprofileComponent},
  {path:'changeprofile',component:EdituserComponent},
  {path:'updatepassword',component:UpdatepasswordComponent},

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
    RouterModule
  ]
})
export class UsersModule { }
