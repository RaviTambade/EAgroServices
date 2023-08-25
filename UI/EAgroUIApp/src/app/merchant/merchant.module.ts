import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { RouterModule, Routes } from '@angular/router';
import { MerchantShipmentListComponent } from './merchant-shipment-list/merchant-shipment-list.component';
import { MerchantShipmentDetailsComponent } from './merchant-shipment-details/merchant-shipment-details.component';
import { MerchantInvoicesComponent } from './merchant-invoices/merchant-invoices.component';
import { MerchantInvoiceDetailsComponent } from './merchant-invoice-details/merchant-invoice-details.component';
import { FormsModule } from '@angular/forms';
import { MerchantShipmentPaymentComponent } from './merchant-shipment-payment/merchant-shipment-payment.component';
import { MerchantbarchartComponent } from './merchantbarchart/merchantbarchart.component';
import { NgChartsModule } from 'ng2-charts';
import { MerchantdoughnutchartComponent } from './merchantdoughnutchart/merchantdoughnutchart.component';
import { MerchantdashboardComponent } from './merchantdashboard/merchantdashboard.component';


const merchantRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'shipmentlist', component: MerchantShipmentListComponent },
  { path: 'shipmentdetails/:shipmentid', component: MerchantShipmentDetailsComponent },
  { path: 'invoices', component: MerchantInvoicesComponent },
  { path: 'invoicedetails/:invoiceid', component: MerchantInvoiceDetailsComponent },
  { path: 'shipment/payment/:shipmentid', component: MerchantShipmentPaymentComponent },
  { path: 'dashboard', component: MerchantbarchartComponent },


]

@NgModule({
  declarations: [
    HomeComponent,
    MerchantShipmentListComponent,
    MerchantShipmentDetailsComponent,
    MerchantInvoicesComponent,
    MerchantInvoiceDetailsComponent,
    MerchantShipmentPaymentComponent,
    MerchantbarchartComponent,
    MerchantdoughnutchartComponent,
    MerchantdashboardComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(merchantRoutes),
    NgChartsModule
  ],
  exports: [
  ],
})
export class MerchantModule { }
