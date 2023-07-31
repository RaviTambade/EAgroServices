import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { Routes } from '@angular/router';
// import { CollectionComponent } from './collection/collection.component';
import { GoodscollectionComponent } from './goodscollection/goodscollection.component';
import { VerifiedcollectionComponent } from './verifiedcollection/verifiedcollection.component';
import { InvoicedetailsComponent } from './invoicedetails/invoicedetails.component';

 export const farmerRoutes: Routes = [
  { path: 'home/:id', component: HomeComponent },
  { path: 'verifiedcollection/:id', component:VerifiedcollectionComponent },
]

@NgModule({
  declarations: [
    HomeComponent,
    // CollectionComponent,
    GoodscollectionComponent,
    VerifiedcollectionComponent,
    InvoicedetailsComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    GoodscollectionComponent,
    VerifiedcollectionComponent
  ]
})
export class FarmerModule { }
