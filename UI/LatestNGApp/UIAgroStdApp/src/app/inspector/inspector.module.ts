import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CollectionverificationComponent } from './collectionverification/collectionverification.component';
import { UnverifiedcollectionComponent } from './unverifiedcollection/unverifiedcollection.component';
import { FilterModule } from '../filter/filter.module';
import { Routes } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { CollectionShipmentFilterListComponent } from './collection-shipment-filter-list/collection-shipment-filter-list.component';

export const inspectorsRoutes:Routes=[
  {path:'dashboard',component:DashboardComponent},
  {path:'verify',component:CollectionverificationComponent},

]
@NgModule({
  declarations: [
    CollectionverificationComponent,
    UnverifiedcollectionComponent,
    UnverifiedcollectionComponent,
    DashboardComponent,
   
  ],
  imports: [
    CommonModule,
    FilterModule
  ],
  exports:[
    CollectionverificationComponent,


  ] 
})
export class InspectorModule { }
