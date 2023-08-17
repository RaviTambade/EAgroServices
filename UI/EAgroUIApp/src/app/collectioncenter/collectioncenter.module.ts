import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { Routes } from '@angular/router';
import { AddCollectionComponent } from './add-collection/add-collection.component';
import { CollectionListComponent } from './collection-list/collection-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CollectionVerificationComponent } from './collection-verification/collection-verification.component';
import { UpdateCollectionComponent } from './update-collection/update-collection.component';
import { VerifyCollectionComponent } from './verify-collection/verify-collection.component';
import { AddtoshipmentComponent } from './addtoshipment/addtoshipment.component';
import { CorporateService } from '../corporate.service';
import { CreateShipmentComponent } from './create-shipment/create-shipment.component';
import { CollectionShipmentListComponent } from './collection-shipment-list/collection-shipment-list.component';
import { CollectionCenterDashboardComponent } from './collection-center-dashboard/collection-center-dashboard.component';
import { NgChartsModule } from 'ng2-charts';
import { SteppedLineChartComponent } from './collection-center-dashboard/stepped-line-chart/stepped-line-chart.component';
import { CollectionPaymentListComponent } from './collection-payment-list/collection-payment-list.component';
import { CollectionPaymentDetailsComponent } from './collection-payment-details/collection-payment-details.component';
import { RevenueLineChartComponent } from './collection-center-dashboard/revenue-line-chart/revenue-line-chart.component';
import { CropBarChartComponent } from './collection-center-dashboard/crop-bar-chart/crop-bar-chart.component';

export const collectionCenterRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'dashboard', component: CollectionCenterDashboardComponent },
  { path: 'addcollection', component: AddCollectionComponent },
  { path: 'verifycollections', component: CollectionVerificationComponent },
]


@NgModule({
  declarations: [
    HomeComponent,
    AddCollectionComponent,
    CollectionVerificationComponent,
    UpdateCollectionComponent,
    VerifyCollectionComponent,
    AddtoshipmentComponent,
    CreateShipmentComponent,
    CollectionListComponent,
    CollectionShipmentListComponent,
    CollectionCenterDashboardComponent,
    SteppedLineChartComponent,
    CollectionPaymentListComponent,
    CollectionPaymentDetailsComponent,
    RevenueLineChartComponent,
    CropBarChartComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgChartsModule
  ],
  exports:[
    CollectionVerificationComponent,
    CollectionListComponent,
    CollectionShipmentListComponent,
    CollectionPaymentListComponent
  ],
  providers:[
    CorporateService,
    DatePipe
  ]
})
export class CollectioncenterModule { }
