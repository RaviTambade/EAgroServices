import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { Routes } from '@angular/router';
import { VehiclesoftransporterComponent } from './vehiclesoftransporter/vehiclesoftransporter.component';

export const transporterRoutes: Routes = [
  { path: 'home/:id', component: HomeComponent },
]



@NgModule({
  declarations: [
    HomeComponent,
    VehiclesoftransporterComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    VehiclesoftransporterComponent
  ]
})
export class TransporterModule { }
