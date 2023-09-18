import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { UpdatePassword } from './Models/update-password';
import { UpdatepasswordComponent } from './updatepassword/updatepassword.component';
import { RouterModule, Routes } from '@angular/router';

export const userRoutes:Routes=[
  {path:'updatepassword',component:UpdatepasswordComponent},
]
@NgModule({
  declarations: [
    LoginComponent,
    UpdatepasswordComponent

  ],
  imports: [
    CommonModule,
    FormsModule, 
    RouterModule
  ],
  exports:[
   UpdatepasswordComponent
  ]
})
export class AuthenticationModule { }
