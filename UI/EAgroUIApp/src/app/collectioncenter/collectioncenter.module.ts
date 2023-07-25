import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { Routes } from '@angular/router';
import { AddCollectionComponent } from './add-collection/add-collection.component';
import { CollectionListComponent } from './collection-list/collection-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CollectionVerificationComponent } from './collection-verification/collection-verification.component';
import { UpdateCollectionComponent } from './update-collection/update-collection.component';
import { CollectionverificationDetailsComponent } from './collectionverification-details/collectionverification-details.component';
import { VerifyCollectionComponent } from './verify-collection/verify-collection.component';

export const collectionCenterRoutes: Routes = [
  { path: 'home', component: HomeComponent },
]


@NgModule({
  declarations: [
    HomeComponent,
    AddCollectionComponent,
    CollectionListComponent,
    CollectionVerificationComponent,
    UpdateCollectionComponent,
    CollectionverificationDetailsComponent,
    VerifyCollectionComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports:[
    CollectionListComponent
  ]
})
export class CollectioncenterModule { }
