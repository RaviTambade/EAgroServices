import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FarmerService } from './farmer.service';
import {  HttpClientModule } from '@angular/common/http';
import { GoogleChartsModule } from 'angular-google-charts';
import { BrowserModule } from '@angular/platform-browser';
<<<<<<< HEAD
import { ProfileComponent } from './profile/profile.component';
=======
import { PurchasedetailsComponent } from './purchasedetails/purchasedetails.component';
>>>>>>> db8f55e41c736e46adec36819d2b27ef5eba8897
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    DashboardComponent,
<<<<<<< HEAD
    ProfileComponent
=======
    PurchasedetailsComponent
>>>>>>> db8f55e41c736e46adec36819d2b27ef5eba8897
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    GoogleChartsModule,
    BrowserModule,
    FormsModule
<<<<<<< HEAD
    
=======
>>>>>>> db8f55e41c736e46adec36819d2b27ef5eba8897
  ],
  
})

export class FarmersModule { }
