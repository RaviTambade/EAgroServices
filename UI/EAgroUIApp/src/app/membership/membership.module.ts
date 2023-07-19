import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisteruserComponent } from './registeruser/registeruser.component';
import { Routes } from '@angular/router';
import { RegisterCorporateComponent } from './register-corporate/register-corporate.component';
import { FormsModule } from '@angular/forms';

export const membershipRoutes: Routes = [
  {path:'user/register/:id',component:RegisteruserComponent},
  {path:'corporate/register/:id',component:RegisterCorporateComponent},
]


@NgModule({
  declarations: [
    RegisteruserComponent,
    RegisterCorporateComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class MembershipModule { }
