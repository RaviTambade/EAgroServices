import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ROUTES, RouterModule, Routes, provideRouter } from '@angular/router';
import { CollectionsComponent } from './collections/collections.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CollectiondetailsComponent } from './collectiondetails/collectiondetails.component';
import { CollectionviewComponent } from './collectionview/collectionview.component';
import { AddcollectionComponent } from './addcollection/addcollection.component';
import { VerifiedcollectionComponent } from './verifiedcollection/verifiedcollection.component';
import { VerifiedcollectiondetailsComponent } from './verifiedcollectiondetails/verifiedcollectiondetails.component';
import { VerifiedComponent } from './verified/verified.component';

export const collectionmanagerRoutes:Routes=[
  {path:'dashboard',component:DashboardComponent},
  {path:'collection',component:CollectionviewComponent},
  {path:'addcollection',component:AddcollectionComponent},
  {path:'verifiedcollection',component:VerifiedcollectionComponent},

]

@NgModule({
  declarations: [
    DashboardComponent,
    CollectionsComponent,
    CollectiondetailsComponent,
    CollectionviewComponent,
    AddcollectionComponent,
    VerifiedcollectionComponent,
    VerifiedcollectiondetailsComponent,
    VerifiedComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(collectionmanagerRoutes),
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class CollectionmanagerModule { }
