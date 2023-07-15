import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { Routes } from '@angular/router';
import { VehiclesoftransporterComponent } from './vehiclesoftransporter/vehiclesoftransporter.component';
import { GetshipmentsofvehicleComponent } from './getshipmentsofvehicle/getshipmentsofvehicle.component';
import { CorporateService } from '../corporate.service';

export const transporterRoutes: Routes = [
  { path: 'home/:id', component: HomeComponent },
  { path: '', component: VehiclesoftransporterComponent },
  {path:'shipments/:id',component: GetshipmentsofvehicleComponent}
]



@NgModule({
  declarations: [
    HomeComponent,
    VehiclesoftransporterComponent,
    GetshipmentsofvehicleComponent,
  ],
  imports: [
    CommonModule
  ],
  exports:[
    VehiclesoftransporterComponent,
    GetshipmentsofvehicleComponent
  ],
  providers:[
    CorporateService
  ]
})
export class TransporterModule { }
