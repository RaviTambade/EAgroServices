import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { CollectionsComponent } from './collections/collections.component';
import { CollectiondetailsComponent } from './collectiondetails/collectiondetails.component';
import { CollectionlistComponent } from './collectionlist/collectionlist.component';
import { InvioceComponent } from './invioce/invioce.component';

export const farmerRoutes:Routes=[
  {path:'dashboard',component:DashboardComponent},
  {path:'collections',component:CollectionsComponent},
  {path:'invoice',component:InvioceComponent},

]


@NgModule({
  declarations: [
    DashboardComponent,
    CollectionsComponent,
    CollectiondetailsComponent,
    CollectionlistComponent,
    InvioceComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(farmerRoutes)
  ]
})
export class FarmerModule { }
