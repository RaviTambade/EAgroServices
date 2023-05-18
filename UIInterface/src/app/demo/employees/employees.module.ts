import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeedashboardComponent } from './employeedashboard/employeedashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { EmployeeNavLeftComponent } from './employee-nav-left/employee-nav-left.component';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserModule } from '@angular/platform-browser';
import { MerchantsListComponent } from './merchants-list/merchants-list.component';
import { MerchantDetailsComponent } from './merchant-details/merchant-details.component';
import { ListComponent } from './list/list.component';
import { DetailsComponent } from './details/details.component';
import { FarmerdetailsComponent } from './details/farmerdetails/farmerdetails.component';
import { FarmerUpdateComponent } from './details/farmerdetails/farmer-update/farmer-update.component';



@NgModule({
   schemas:[CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    EmployeeNavLeftComponent,
    EmployeedashboardComponent,
   MerchantsListComponent,
   MerchantDetailsComponent,
   ListComponent,
   DetailsComponent,
   FarmerdetailsComponent,
   FarmerUpdateComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
       RouterModule,
       NgbDropdownModule,
       BrowserModule,
       ReactiveFormsModule

  ]
})
export class EmployeesModule { }
