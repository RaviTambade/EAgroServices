import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CollectionverificationComponent } from './collectionverification/collectionverification.component';
import { UnverifiedcollectionComponent } from './unverifiedcollection/unverifiedcollection.component';
import { FilterModule } from '../filter/filter.module';
import { Routes } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { CollectionShipmentFilterListComponent } from './collection-shipment-filter-list/collection-shipment-filter-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VerificationComponent } from './verification/verification.component';
import { VerifiedcollectionComponent } from '../farmer/verifiedcollection/verifiedcollection.component';
import { VerifyCollectionComponent } from './verify-collection/verify-collection.component';
import { CollectiondetailsComponent } from './collectiondetails/collectiondetails.component';

export const inspectorsRoutes:Routes=[
  {path:'dashboard',component:DashboardComponent},
  {path:'collections',component:VerificationComponent},

]
@NgModule({
  declarations: [
    CollectionverificationComponent,
    UnverifiedcollectionComponent,
    VerifiedcollectionComponent,
    VerifyCollectionComponent,
    DashboardComponent,
    VerificationComponent,
    CollectiondetailsComponent
   
  ],
  imports: [
    CommonModule,
    FilterModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports:[
    CollectionverificationComponent,


  ] 
})
export class InspectorModule { }
