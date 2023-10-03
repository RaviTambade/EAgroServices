import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { InvoicesComponent } from './invoices/invoices.component';
import { InvoicelistComponent } from './invoicelist/invoicelist.component';
import { InvoicedetailsComponent } from './invoicedetails/invoicedetails.component';


export const merchantRoutes:Routes=[


]


@NgModule({
  declarations: [
    DashboardComponent,
    InvoicesComponent,
    InvoicelistComponent,
    InvoicedetailsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(merchantRoutes)
  ]
})
export class MerchantModule { }
