import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ROUTES, RouterModule, Routes, provideRouter } from '@angular/router';
import { CollectionsComponent } from './collections/collections.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CollectiondetailsComponent } from './collectiondetails/collectiondetails.component';
import { CollectionviewComponent } from './collectionview/collectionview.component';
import { AddcollectionComponent } from './addcollection/addcollection.component';
import { VerifiedcollectionComponent } from './verifiedcollection/verifiedcollection.component';
import { VerifiedcollectiondetailsComponent } from './verifiedcollectiondetails/verifiedcollectiondetails.component';
import { VerifiedComponent } from './verified/verified.component';
import { AddtoshipmentComponent } from './addtoshipment/addtoshipment.component';
import { CreateshipmentComponent } from './createshipment/createshipment.component';
import { CollectionShipmentListComponent } from './collection-shipment-list/collection-shipment-list.component';
import { CollectionPaymentListComponent } from './collection-payment-list/collection-payment-list.component';
import { CollectionPaymentDetailsComponent } from './collection-payment-details/collection-payment-details.component';
import { BankingComponent } from './banking/banking.component';
import { isNgContainer } from '@angular/compiler';
import { InvoicelistComponent } from './invoicelist/invoicelist.component';

export const collectionmanagerRoutes:Routes=[
  {path:'dashboard',component:DashboardComponent},
  {path:'collection',component:CollectionviewComponent},
  {path:'addcollection',component:AddcollectionComponent},
  {path:'verifiedcollection',component:VerifiedComponent},
  {path:'shipmentlist',component:CollectionShipmentListComponent},
  {path:'banking',component:BankingComponent},

]

@NgModule({
  declarations: [
    DashboardComponent,
    CollectionsComponent,
    CollectiondetailsComponent,
    CollectionviewComponent,
    AddcollectionComponent,
    VerifiedcollectionComponent,
    VerifiedcollectiondetailsComponent,
    VerifiedComponent,
    AddtoshipmentComponent,
    CreateshipmentComponent,
    CollectionShipmentListComponent,
    CollectionPaymentListComponent,
    InvoicelistComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(collectionmanagerRoutes),
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class CollectionmanagerModule { }
