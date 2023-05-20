import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeedashboardComponent } from './employeedashboard/employeedashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { EmployeeNavLeftComponent } from './employee-nav-left/employee-nav-left.component';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserModule } from '@angular/platform-browser';
import { ListComponent } from './list/list.component';
import { DetailsComponent } from './details/details.component';
import { FarmerdetailsComponent } from './details/farmerdetails/farmerdetails.component';
import { MerchantDetailsComponent } from './details/merchant-details/merchant-details.component';
import { FarmersModule } from '../farmers/farmers.module';



@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    EmployeeNavLeftComponent,
    EmployeedashboardComponent,
    ListComponent,
    DetailsComponent,
    FarmerdetailsComponent,
    MerchantDetailsComponent,
   
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    NgbDropdownModule,
    BrowserModule,
    ReactiveFormsModule,
    FarmersModule
  ]
})
export class EmployeesModule { }
