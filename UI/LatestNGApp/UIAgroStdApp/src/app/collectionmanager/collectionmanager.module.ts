import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ROUTES, RouterModule, Routes, provideRouter } from '@angular/router';

export const collectionmanagerRoutes:Routes=[
  {path:'dashboard',component:DashboardComponent},

]

@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(collectionmanagerRoutes)
  ]
})
export class CollectionmanagerModule { }
