import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { Routes } from '@angular/router';
// import { CollectionComponent } from './collection/collection.component';
import { GoodscollectionComponent } from './goodscollection/goodscollection.component';
import { VerifiedcollectionComponent } from './verifiedcollection/verifiedcollection.component';
import { InvoicedetailsComponent } from './invoicedetails/invoicedetails.component';
import { NgChartsModule } from 'ng2-charts';
import { FormsModule } from '@angular/forms';
import { FarmerpiechartComponent } from './farmerpiechart/farmerpiechart.component';
import { RevenuebarchartComponent } from './revenuebarchart/revenuebarchart.component';

 export const farmerRoutes: Routes = [
  { path: 'home/:id', component: HomeComponent },
  { path: 'verifiedcollection/:id', component:VerifiedcollectionComponent },
]

@NgModule({
  declarations: [
    HomeComponent,
    // CollectionComponent,
    GoodscollectionComponent,
    VerifiedcollectionComponent,
    InvoicedetailsComponent,
    RevenuebarchartComponent,
    FarmerpiechartComponent
  ],
  imports: [
    CommonModule,
    NgChartsModule,
    FormsModule
  ],
  exports: [
    GoodscollectionComponent,
    VerifiedcollectionComponent,
    FarmerpiechartComponent,
    RevenuebarchartComponent
  ],
  providers:[]
})
export class FarmerModule { }
