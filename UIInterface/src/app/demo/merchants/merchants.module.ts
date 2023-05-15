import { NgModule ,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MerchantDashboardComponent } from './merchant-dashboard/merchant-dashboard.component';
import { MerchantNavLeftComponent } from './merchant-nav-left/merchant-nav-left.component';
import { MerchantProfileComponent } from './merchant-profile/merchant-profile.component';
import { MerchantUpdateComponent } from './merchant-update/merchant-update.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MerchantPurchaselistComponent } from './merchant-purchaselist/merchant-purchaselist.component';
import { GoogleChartsModule } from 'angular-google-charts';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    MerchantDashboardComponent,
    MerchantNavLeftComponent,
    MerchantProfileComponent,
    MerchantUpdateComponent,
    MerchantPurchaselistComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    GoogleChartsModule
  ]
})
export class MerchantsModule { }
