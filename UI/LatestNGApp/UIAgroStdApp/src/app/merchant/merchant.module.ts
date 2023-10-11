import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { InvoicedetailsComponent } from './invoicedetails/invoicedetails.component';
import { InvoicesComponent } from './invoices/invoices.component';
import { FormsModule } from '@angular/forms';
import { ShipmentlistComponent } from './shipmentlist/shipmentlist.component';
import { ShipmentdetailsComponent } from './shipmentdetails/shipmentdetails.component';
import { ShipmentpaymentComponent } from './shipmentpayment/shipmentpayment.component';
import { HomeComponent } from '../home/home.component';
import { NgChartsModule } from 'ng2-charts';



export const merchantRoutes:Routes=[
  { path: 'home', component: HomeComponent },
  { path: 'shipmentlist', component: ShipmentlistComponent },
  { path: 'shipmentdetails/:shipmentid', component: ShipmentdetailsComponent },
  { path: 'invoices', component: InvoicesComponent },
  { path: 'invoicedetails/:invoiceid', component: InvoicedetailsComponent },
  { path: 'shipment/payment/:shipmentid', component: ShipmentpaymentComponent },
  { path: 'dashboard', component: DashboardComponent },


]

@NgModule({
  declarations: [
    DashboardComponent,
    InvoicedetailsComponent,
    InvoicesComponent,
    ShipmentlistComponent,
    ShipmentdetailsComponent,
    ShipmentpaymentComponent,
  
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(merchantRoutes),
    NgChartsModule
  ]
})
export class MerchantModule { }
