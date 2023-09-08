import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterModule, Routes } from '@angular/router';


export const transporterRoutes:Routes=[
  {path:'dashboard',component:DashboardComponent},
]

@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(transporterRoutes)
  ]
})
export class TransporterModule { }
