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
import { MerchantLogoutComponent } from './merchant-logout/merchant-logout.component';

@NgModule({
  declarations: [
    MerchantDashboardComponent,
    MerchantNavLeftComponent,
    MerchantProfileComponent,
    MerchantUpdateComponent,
    MerchantPurchaselistComponent,
    MerchantLogoutComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    GoogleChartsModule
  ],
  exports:[
    MerchantUpdateComponent,
    MerchantPurchaselistComponent
  ]

})
export class MerchantsModule { }
