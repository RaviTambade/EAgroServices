import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { Routes } from '@angular/router';
import { AddCollectionComponent } from './add-collection/add-collection.component';
import { CollectionListComponent } from './collection-list/collection-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CollectionVerificationComponent } from './collection-verification/collection-verification.component';
import { UpdateCollectionComponent } from './update-collection/update-collection.component';
import { CollectionverificationDetailsComponent } from './collectionverification-details/collectionverification-details.component';
import { VerifyCollectionComponent } from './verify-collection/verify-collection.component';
import { AddtoshipmentComponent } from './addtoshipment/addtoshipment.component';
import { CorporateService } from '../corporate.service';
import { CreateShipmentComponent } from './create-shipment/create-shipment.component';
import { CollectionShipmentListComponent } from './collection-shipment-list/collection-shipment-list.component';
import { CollectionListHeadComponent } from './collection-list-head/collection-list-head.component';

export const collectionCenterRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'addcollection', component: AddCollectionComponent },
  { path: 'verifycollections', component: CollectionVerificationComponent },
]


@NgModule({
  declarations: [
    HomeComponent,
    AddCollectionComponent,
    CollectionVerificationComponent,
    UpdateCollectionComponent,
    CollectionverificationDetailsComponent,
    VerifyCollectionComponent,
    AddtoshipmentComponent,
    CreateShipmentComponent,
    CollectionListComponent,
    CollectionShipmentListComponent,
    CollectionListHeadComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports:[
    AddCollectionComponent,
    VerifyCollectionComponent,
    CollectionVerificationComponent,
    AddtoshipmentComponent,
    CollectionListHeadComponent,
    CollectionListComponent,
  ],
  providers:[
    CorporateService,
    DatePipe
  ]
})
export class CollectioncenterModule { }
