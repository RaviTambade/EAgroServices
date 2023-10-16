import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CollectionverificationComponent } from './collectionverification/collectionverification.component';
import { UnverifiedcollectionComponent } from './unverifiedcollection/unverifiedcollection.component';
import { FilterModule } from '../filter/filter.module';
import { Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VerificationComponent } from './verification/verification.component';
import { VerifyCollectionComponent } from './verify-collection/verify-collection.component';
import { CollectiondetailsComponent } from './collectiondetails/collectiondetails.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgChartsModule } from 'ng2-charts';

export const inspectorsRoutes:Routes=[
  {path:'collections',component:VerificationComponent},
  {path:'dashboard',component:DashboardComponent},

]
@NgModule({
  declarations: [
    CollectionverificationComponent,
    UnverifiedcollectionComponent,
    VerifyCollectionComponent,
    DashboardComponent,
    VerificationComponent,
    CollectiondetailsComponent
   
  ],
  imports: [
    CommonModule,
    FilterModule,
    FormsModule,
    ReactiveFormsModule,
    NgChartsModule
  ],
  exports:[
    CollectionverificationComponent,


  ] 
})
export class InspectorModule { }
