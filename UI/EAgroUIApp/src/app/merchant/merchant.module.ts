import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { RouterModule, Routes } from '@angular/router';
import { MerchantShipmentListComponent } from './merchant-shipment-list/merchant-shipment-list.component';
import { MerchantShipmentDetailsComponent } from './merchant-shipment-details/merchant-shipment-details.component';
import { MerchantInvoicesComponent } from './merchant-invoices/merchant-invoices.component';
import { MerchantInvoiceDetailsComponent } from './merchant-invoice-details/merchant-invoice-details.component';
import { FormsModule } from '@angular/forms';
import { MerchantRoutingComponent } from './merchant-routing/merchant-routing.component';


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
    MerchantRoutingComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  exports:[
    MerchantRoutingComponent
  ]
})
export class MerchantModule { }
