import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FarmerDashboardComponent } from './farmerdashboard/farmerdashboard.component';
import {  HttpClientModule } from '@angular/common/http';
import { GoogleChartsModule } from 'angular-google-charts';
import { BrowserModule } from '@angular/platform-browser';
import { ProfileComponent } from './profile/profile.component';
import { FormsModule } from '@angular/forms';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { FarmerSelllistComponent } from './farmer-selllist/farmer-selllist.component';
import { RouterModule } from '@angular/router';
import { FarmerNavLeftComponent } from './farmer-nav-left/farmer-nav-left.component';
import { FarmerUpdateComponent } from './farmer-update/farmer-update.component';
import { VarietyComponent } from './variety/variety.component';
import { FarmerLogoutComponent } from './farmer-logout/farmer-logout.component';
import { PieChartComponent } from './farmerdashboard/pie-chart/pie-chart.component';
import { ColumnChartComponent } from './farmerdashboard/column-chart/column-chart.component';
import { AreaChartComponent } from './farmerdashboard/area-chart/area-chart.component';



@NgModule({
  declarations: [
    FarmerDashboardComponent,
    ProfileComponent,
    FarmerSelllistComponent,
    FarmerNavLeftComponent,
    FarmerUpdateComponent,
    VarietyComponent,
    FarmerLogoutComponent,
    PieChartComponent,
    ColumnChartComponent,
    AreaChartComponent,
 
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    GoogleChartsModule,
    BrowserModule,
    FormsModule,
    NgScrollbarModule,
    RouterModule
  ],
  exports:[
    FarmerSelllistComponent
  ]
  
})

export class FarmersModule { }
