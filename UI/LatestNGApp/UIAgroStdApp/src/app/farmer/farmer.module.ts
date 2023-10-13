import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { CollectionsComponent } from './collections/collections.component';
import { CollectiondetailsComponent } from './collectiondetails/collectiondetails.component';
import { CollectionlistComponent } from './collectionlist/collectionlist.component';
import { InvioceComponent } from './invioce/invioce.component';
import { UnverifiedcollectionComponent } from './unverifiedcollection/unverifiedcollection.component';
import { FormsModule } from '@angular/forms';
import { InvoicelistComponent } from './invoicelist/invoicelist.component';
import { InvoicedetailsComponent } from './invoicedetails/invoicedetails.component';
import { TotalinvoiceComponent } from './totalinvoice/totalinvoice.component';
import { BankstatementComponent } from './bankstatement/bankstatement.component';
import { RevenuechartComponent } from './revenuechart/revenuechart.component';
import { NgChartsModule } from 'ng2-charts';
// import { NgChartsModule } from 'ng2-charts';

export const farmerRoutes:Routes=[
  {path:'dashboard',component:DashboardComponent},
  {path:'collections',component:CollectionsComponent},
  {path:'invoice',component:InvioceComponent},
  {path:'invoicelist',component:TotalinvoiceComponent},
  {path:'unverified',component:UnverifiedcollectionComponent},
  {path:'bankstatement',component:BankstatementComponent},

]


@NgModule({
  declarations: [
    DashboardComponent,
    CollectionsComponent,
    CollectiondetailsComponent,
    CollectionlistComponent,
    InvioceComponent,
    UnverifiedcollectionComponent,
    InvoicelistComponent,
    InvoicedetailsComponent,
    TotalinvoiceComponent,
    BankstatementComponent,
    RevenuechartComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(farmerRoutes),
    FormsModule,
     NgChartsModule
  ]
})
export class FarmerModule { }
