import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { CollectionsComponent } from './collections/collections.component';
import { CollectiondetailsComponent } from './collectiondetails/collectiondetails.component';
import { CollectionlistComponent } from './collectionlist/collectionlist.component';
import { InvioceComponent } from './invioce/invioce.component';
import { VerifiedcollectionComponent } from './verifiedcollection/verifiedcollection.component';
import { UnverifiedcollectionComponent } from './unverifiedcollection/unverifiedcollection.component';
import { FormsModule } from '@angular/forms';
import { InvoicelistComponent } from './invoicelist/invoicelist.component';
import { InvoicedetailsComponent } from './invoicedetails/invoicedetails.component';
import { TotalinvoiceComponent } from './totalinvoice/totalinvoice.component';

export const farmerRoutes:Routes=[
  {path:'dashboard',component:DashboardComponent},
  {path:'collections',component:CollectionsComponent},
  {path:'invoice',component:InvioceComponent},
  {path:'invoicelist',component:TotalinvoiceComponent},
  {path:'verified',component:VerifiedcollectionComponent},
  {path:'unverified',component:UnverifiedcollectionComponent},

]


@NgModule({
  declarations: [
    DashboardComponent,
    CollectionsComponent,
    CollectiondetailsComponent,
    CollectionlistComponent,
    InvioceComponent,
    VerifiedcollectionComponent,
    UnverifiedcollectionComponent,
    InvoicelistComponent,
    InvoicedetailsComponent,
    TotalinvoiceComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(farmerRoutes),
    FormsModule,
  ]
})
export class FarmerModule { }
