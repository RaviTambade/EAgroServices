import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { Routes } from '@angular/router';

export const collectionRoutes: Routes = [
  { path: 'home/:id', component: HomeComponent },
]


@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule
  ]
})
export class CollectioncenterModule { }
