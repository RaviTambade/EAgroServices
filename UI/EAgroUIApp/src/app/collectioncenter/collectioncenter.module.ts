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
import { CollectionListFilterComponent } from './collection-list-filter/collection-list-filter.component';
import { FilterModule } from '../Shared/filter/filter.module';

export const collectionCenterRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'addcollection', component: AddCollectionComponent },
  { path: 'verifycollections', component: CollectionVerificationComponent },
  { path: 'verifiedcollections', component: CollectionListFilterComponent },
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
    CollectionListFilterComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FilterModule
  ],
  exports:[
    AddCollectionComponent,
    VerifyCollectionComponent,
    CollectionVerificationComponent,
    AddtoshipmentComponent
  ],
  providers:[
    CorporateService,
    DatePipe
  ]
})
export class CollectioncenterModule { }
