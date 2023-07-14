import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile/profile.component';
import { HomeComponent } from './home/home.component';
import { Routes } from '@angular/router';
// import { CollectionComponent } from './collection/collection.component';
import { GoodscollectionComponent } from './goodscollection/goodscollection.component';

 export const farmerRoutes: Routes = [
  { path: 'home/:id', component: HomeComponent },
]

@NgModule({
  declarations: [
    ProfileComponent,
    HomeComponent,
    // CollectionComponent,
    GoodscollectionComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ProfileComponent
  ]
})
export class FarmerModule { }