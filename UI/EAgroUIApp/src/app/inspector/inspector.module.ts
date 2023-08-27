import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CollectionVerificationComponent } from './collection-verification/collection-verification.component';
import { CollectionCenterFiltersModule } from '../collection-center-filters/collection-center-filters.module';
import { RouterModule, Routes } from '@angular/router';
import { FilterModule } from '../Shared/filter/filter.module';
import { canActivateInspectorRoutes } from '../Guards/guards';

const inspectorRoutes: Routes = [
  { path: 'verify', component: CollectionVerificationComponent ,canActivate:[canActivateInspectorRoutes()]},
]

@NgModule({
  declarations: [
    CollectionVerificationComponent
  ],
  imports: [
    CommonModule,
    CollectionCenterFiltersModule,
    FilterModule,
    RouterModule.forChild(inspectorRoutes)
  ]
})
export class InspectorModule { }
