import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ROUTES, RouterModule, Routes, provideRouter } from '@angular/router';
import { CollectionsComponent } from './collections/collections.component';
import { FormsModule } from '@angular/forms';
import { CollectiondetailsComponent } from './collectiondetails/collectiondetails.component';

export const collectionmanagerRoutes:Routes=[
  {path:'dashboard',component:DashboardComponent},
  {path:'collectionlist',component:CollectionsComponent},

]

@NgModule({
  declarations: [
    DashboardComponent,
    CollectionsComponent,
    CollectiondetailsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(collectionmanagerRoutes),
    FormsModule,
  ]
})
export class CollectionmanagerModule { }
