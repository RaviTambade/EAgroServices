import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { Routes } from '@angular/router';
import { VehiclesoftransporterComponent } from './vehiclesoftransporter/vehiclesoftransporter.component';
import { GetshipmentsofvehicleComponent } from './getshipmentsofvehicle/getshipmentsofvehicle.component';
import { CorporateService } from '../corporate.service';
import { AddnewvehicleComponent } from './addnewvehicle/addnewvehicle.component';
import { FormsModule } from '@angular/forms';

export const transporterRoutes: Routes = [
  { path: 'home/:id', component: HomeComponent },
  { path: '', component: VehiclesoftransporterComponent },
  {path:'shipments/:id',component: GetshipmentsofvehicleComponent},
    {path:'addvehicle',component:AddnewvehicleComponent}
]



@NgModule({
  declarations: [
    HomeComponent,
    VehiclesoftransporterComponent,
    GetshipmentsofvehicleComponent,
    AddnewvehicleComponent,
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports:[
    VehiclesoftransporterComponent,
    GetshipmentsofvehicleComponent,
    AddnewvehicleComponent
  ],
  providers:[
    CorporateService
  ]
})
export class TransporterModule { }
