import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeedashboardComponent } from './employeedashboard/employeedashboard.component';
import { FarmersdetailsComponent } from './farmersdetails/farmersdetails.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    EmployeedashboardComponent,
    FarmersdetailsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgModule
  ]
})
export class EmployeesModule { }
