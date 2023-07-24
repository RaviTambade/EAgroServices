import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { RouterModule, Routes } from '@angular/router';
import { VehiclesoftransporterComponent } from './vehiclesoftransporter/vehiclesoftransporter.component';
import { GetshipmentsofvehicleComponent } from './getshipmentsofvehicle/getshipmentsofvehicle.component';
import { CorporateService } from '../corporate.service';
import { AddnewvehicleComponent } from './addnewvehicle/addnewvehicle.component';
import { FormsModule } from '@angular/forms';
import { GetvehicleshipmentitemsComponent } from './getvehicleshipmentitems/getvehicleshipmentitems.component';
import { GetallshipmentsComponent } from './getallshipments/getallshipments.component';

export const transporterRoutes: Routes = [
  { path: 'home/:id', component: HomeComponent },
  { path: 'vehicles', component: VehiclesoftransporterComponent },
  {path:'shipments/:id',component: GetshipmentsofvehicleComponent},
    {path:'addvehicle',component:AddnewvehicleComponent},
    {path:'shipmentdetails/:id',component:GetvehicleshipmentitemsComponent}
]


@NgModule({
  declarations: [
    HomeComponent,
    VehiclesoftransporterComponent,
    GetshipmentsofvehicleComponent,
    AddnewvehicleComponent,
    GetvehicleshipmentitemsComponent,
    GetallshipmentsComponent,

  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(transporterRoutes)
  ],
  exports:[
    VehiclesoftransporterComponent,
    GetshipmentsofvehicleComponent,
    AddnewvehicleComponent,
    GetallshipmentsComponent
  ],
  providers:[
    CorporateService
  ]
})
export class TransporterModule { }
