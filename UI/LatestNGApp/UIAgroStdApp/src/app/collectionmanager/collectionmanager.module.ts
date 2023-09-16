import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ROUTES, RouterModule, Routes, provideRouter } from '@angular/router';
import { CollectionsComponent } from './collections/collections.component';
import { FormsModule } from '@angular/forms';

export const collectionmanagerRoutes:Routes=[
  {path:'dashboard',component:DashboardComponent},
  {path:'collectionlist',component:CollectionsComponent},

]

@NgModule({
  declarations: [
    DashboardComponent,
    CollectionsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(collectionmanagerRoutes),
    FormsModule,
  ]
})
export class CollectionmanagerModule { }
