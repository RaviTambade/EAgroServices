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
import { MerchantsModule } from '../merchants/merchants.module';
import { FarmerPurchaseFormComponent } from './farmer-purchase-form/farmer-purchase-form.component';
import { TranportDetailsComponent } from './details/tranport-details/tranport-details.component';
import { TransportModule } from '../transport/transport.module';
<<<<<<< HEAD
import { CollectionsellComponent } from './collectionsell/collectionsell.component';
=======
import { CollectionformComponent } from './collectionform/collectionform.component';
import { HttpClientModule } from '@angular/common/http';
>>>>>>> fb6da2a14f4a744136388b556020f190594fc339



@NgModule({
  declarations: [
    EmployeeNavLeftComponent,
    EmployeedashboardComponent,
    ListComponent,
    DetailsComponent,
    FarmerdetailsComponent,
    MerchantDetailsComponent,
    FarmerPurchaseFormComponent,
    TranportDetailsComponent,
<<<<<<< HEAD
    CollectionsellComponent,
=======
    CollectionformComponent,
>>>>>>> fb6da2a14f4a744136388b556020f190594fc339
   
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    NgbDropdownModule,
    BrowserModule,
    ReactiveFormsModule,
    FarmersModule,
    MerchantsModule,
    TransportModule,
    HttpClientModule
  ],
  exports:[
    ListComponent,CollectionsellComponent,
  ]
})


export class EmployeesModule {

 }
