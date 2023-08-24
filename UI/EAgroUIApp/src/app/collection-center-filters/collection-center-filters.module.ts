import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CollectionListFilterComponent } from './collection-list-filter/collection-list-filter.component';
import { VeifiedCollectionListFilterComponent } from './veified-collection-list-filter/veified-collection-list-filter.component';
import { FilterModule } from '../Shared/filter/filter.module';
import { RouterModule, Routes } from '@angular/router';
import { CollectionShipmentFilterListComponent } from './collection-shipment-filter-list/collection-shipment-filter-list.component';
import { CollectionPaymentListFilterComponent } from './collection-payment-list-filter/collection-payment-list-filter.component';

const collectionCenterFilterRoutes: Routes = [
  { path: 'collections', component: CollectionListFilterComponent },
  { path: 'verifiedcollections', component: VeifiedCollectionListFilterComponent },
  { path: 'shipments', component: CollectionShipmentFilterListComponent },
  { path: 'payment', component: CollectionPaymentListFilterComponent },
]


@NgModule({
  declarations: [
    CollectionListFilterComponent,
    VeifiedCollectionListFilterComponent,
    CollectionShipmentFilterListComponent,
    CollectionPaymentListFilterComponent
  ],
  imports: [
    CommonModule,
    FilterModule,
    RouterModule.forChild(collectionCenterFilterRoutes)
  ]
})
export class CollectionCenterFiltersModule { }
