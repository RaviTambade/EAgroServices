import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { Routes } from '@angular/router';
import { MerchantShipmentListComponent } from './merchant-shipment-list/merchant-shipment-list.component';
import { MerchantShipmentDetailsComponent } from './merchant-shipment-details/merchant-shipment-details.component';
import { MerchantInvoicesComponent } from './merchant-invoices/merchant-invoices.component';
import { MerchantInvoiceDetailsComponent } from './merchant-invoice-details/merchant-invoice-details.component';
import { FormsModule } from '@angular/forms';


export const merchantRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'shipmentlist', component:MerchantShipmentListComponent  },
  { path: 'shipmentdetails/:shipmentid', component:MerchantShipmentDetailsComponent  },
  { path: 'invoices', component:MerchantInvoicesComponent  },
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
    CommonModule,
    FormsModule
  ]
})
export class MerchantModule { }
