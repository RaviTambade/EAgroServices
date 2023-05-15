import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeedashboardComponent } from './employeedashboard/employeedashboard.component';
import { FormsModule } from '@angular/forms';
import { FarmersListComponent } from './farmers-list/farmers-list.component';
import { FarmerDetailsComponent } from './farmer-details/farmer-details.component';
import { RouterModule } from '@angular/router';
import { EmployeeNavLeftComponent } from './employee-nav-left/employee-nav-left.component';
import { FarmerDeleteComponent } from './farmers-list/farmer-delete/farmer-delete.component';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserModule } from '@angular/platform-browser';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';


@NgModule({
   schemas:[CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    EmployeeNavLeftComponent,
    EmployeedashboardComponent,
   FarmersListComponent,
   FarmerDetailsComponent,
   FarmerDeleteComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
       RouterModule,
       NgbDropdownModule,
       BrowserModule, BsDropdownModule,
  ]
})
export class EmployeesModule { }
