import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CollectionListFilterComponent } from './collection-list-filter/collection-list-filter.component';
import { VeifiedCollectionListFilterComponent } from './veified-collection-list-filter/veified-collection-list-filter.component';
import { FilterModule } from '../Shared/filter/filter.module';
import { Routes } from '@angular/router';

export const collectionCenterFilterRoutes: Routes = [
  { path: 'collections', component: CollectionListFilterComponent },
  { path: 'verifiedcollections', component: VeifiedCollectionListFilterComponent },
]


@NgModule({
  declarations: [
    CollectionListFilterComponent,
    VeifiedCollectionListFilterComponent
  ],
  imports: [
    CommonModule,
    FilterModule
  ]
})
export class CollectionCenterFiltersModule { }
