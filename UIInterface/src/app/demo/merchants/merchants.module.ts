import { NgModule ,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MerchantDashboardComponent } from './merchant-dashboard/merchant-dashboard.component';
import { MerchantNavLeftComponent } from './merchant-nav-left/merchant-nav-left.component';
import { MerchantProfileComponent } from './merchant-profile/merchant-profile.component';
import { MerchantUpdateComponent } from './merchant-update/merchant-update.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    MerchantDashboardComponent,
    MerchantNavLeftComponent,
    MerchantProfileComponent,
    MerchantUpdateComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ]
})
export class MerchantsModule { }
