import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { Routes } from '@angular/router';
import { MerchantShipmentListComponent } from './merchant-shipment-list/merchant-shipment-list.component';
import { MerchantShipmentDetailsComponent } from './merchant-shipment-details/merchant-shipment-details.component';
import { MerchantInvoicesComponent } from './merchant-invoices/merchant-invoices.component';
import { MerchantInvoiceDetailsComponent } from './merchant-invoice-details/merchant-invoice-details.component';


export const merchantRoutes: Routes = [
  { path: 'home/:id', component: HomeComponent },
  { path: 'shipmentlist/:id', component:MerchantShipmentListComponent  },
  { path: 'shipmentdetails/:shipmentid', component:MerchantShipmentDetailsComponent  },
  { path: 'invoices/:id', component:MerchantInvoicesComponent  },
  { path: 'invoicedetails/:invoiceid', component:MerchantInvoiceDetailsComponent  },

]

@NgModule({
  declarations: [
    HomeComponent,
    MerchantShipmentListComponent,
    MerchantShipmentDetailsComponent,
    MerchantInvoicesComponent,
    MerchantInvoiceDetailsComponent,
  ],
  imports: [
    CommonModule
  ]
})
export class MerchantModule { }
