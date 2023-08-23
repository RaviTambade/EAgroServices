import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { Routes } from '@angular/router';
import { GoodscollectionComponent } from './goodscollection/goodscollection.component';
import { VerifiedcollectionComponent } from './verifiedcollection/verifiedcollection.component';
import { InvoicedetailsComponent } from './invoicedetails/invoicedetails.component';
import { NgChartsModule } from 'ng2-charts';
import { FormsModule } from '@angular/forms';
import { FarmerpiechartComponent } from './farmerpiechart/farmerpiechart.component';
import { RevenuebarchartComponent } from './revenuebarchart/revenuebarchart.component';
import { CropModule } from '../crop/crop.module';
import { FarmerdashboardComponent } from './farmerdashboard/farmerdashboard.component';
import { CollectionsComponent } from './collections/collections.component';
import { CollectionstatusComponent } from './verifiedcollection/collectionstatus/collectionstatus.component';
import { FarmerbankingComponent } from './farmerbanking/farmerbanking.component';

 export const farmerRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  {path:'dashboard',component:FarmerdashboardComponent},
  { path: 'unverifiedcollection', component:GoodscollectionComponent },
  { path: 'collection', component:CollectionsComponent },
  { path: 'verifiedcollection', component:VerifiedcollectionComponent },
  { path: 'invoice/:id', component:InvoicedetailsComponent },
  { path: 'paidcollection/:status', component:CollectionstatusComponent },
  { path: 'unpaidcollection/:status', component:CollectionstatusComponent },
  { path: 'bankstatement', component:FarmerbankingComponent },


]

@NgModule({
  declarations: [
    HomeComponent,
    GoodscollectionComponent,
    VerifiedcollectionComponent,
    InvoicedetailsComponent,
    RevenuebarchartComponent,
    FarmerpiechartComponent,
    FarmerdashboardComponent,
    CollectionsComponent,
    CollectionstatusComponent,
    FarmerbankingComponent,
  ],
  imports: [
    CommonModule,
    NgChartsModule,
    FormsModule,
    CropModule
  ],
  exports: [
    GoodscollectionComponent,
    FarmerpiechartComponent,
    RevenuebarchartComponent
  ],
  providers:[]
})
export class FarmerModule { }
