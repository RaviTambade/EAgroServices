import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CollectionListFilterComponent } from './collection-list-filter/collection-list-filter.component';
import { VeifiedCollectionListFilterComponent } from './veified-collection-list-filter/veified-collection-list-filter.component';
import { FilterModule } from '../Shared/filter/filter.module';
import { RouterModule, Routes } from '@angular/router';
import { CollectionShipmentFilterListComponent } from './collection-shipment-filter-list/collection-shipment-filter-list.component';
import { CollectionPaymentListFilterComponent } from './collection-payment-list-filter/collection-payment-list-filter.component';
import { canActivateCollectionCenterRoutes } from '../Guards/guards';

const collectionCenterFilterRoutes: Routes = [
  { path: 'collections', component: CollectionListFilterComponent , canActivate: [canActivateCollectionCenterRoutes()],},
  { path: 'verifiedcollections', component: VeifiedCollectionListFilterComponent , canActivate: [canActivateCollectionCenterRoutes()], },
  { path: 'shipments', component: CollectionShipmentFilterListComponent, canActivate: [canActivateCollectionCenterRoutes()], },
  { path: 'payment', component: CollectionPaymentListFilterComponent,  canActivate: [canActivateCollectionCenterRoutes()], },
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
  ],
  exports:[
    CollectionListFilterComponent
  ]
})
export class CollectionCenterFiltersModule { }
