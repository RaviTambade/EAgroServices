import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FarmerService } from './farmer.service';
import {  HttpClientModule } from '@angular/common/http';
import { GoogleChartsModule } from 'angular-google-charts';
import { BrowserModule } from '@angular/platform-browser';
import { PurchasedetailsComponent } from './purchasedetails/purchasedetails.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    DashboardComponent,
    PurchasedetailsComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    GoogleChartsModule,
    BrowserModule,
    FormsModule
  ],
  
})

export class FarmersModule { }
