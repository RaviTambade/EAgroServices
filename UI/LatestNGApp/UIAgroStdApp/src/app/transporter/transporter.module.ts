import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { VehiclesComponent } from './vehicles/vehicles.component';
import { GetshipmentofvehicleComponent } from './getshipmentofvehicle/getshipmentofvehicle.component';
import { TransporterviewComponent } from './transporterview/transporterview.component';
import { GetvehicleshipmentitemsComponent } from './getvehicleshipmentitems/getvehicleshipmentitems.component';
import { GetallshipmentsComponent } from './getallshipments/getallshipments.component';
import { ShipmentsComponent } from './shipments/shipments.component';
import { InvoicesComponent } from './invoices/invoices.component';


export const transporterRoutes:Routes=[
  {path:'dashboard',component:DashboardComponent},
  {path:'transporterview',component:TransporterviewComponent},
  {path:'dashboard',component:DashboardComponent},
  { path: 'getshipmentofvehicle/:vehicleId', component: GetshipmentofvehicleComponent },
  { path: 'shipmentdetails/:id', component: GetvehicleshipmentitemsComponent },
  {path:'shipments', component:ShipmentsComponent},
  {path:'allshipments',component:GetallshipmentsComponent},
  {path:'invoices',component:InvoicesComponent}

]

@NgModule({
  declarations: [
    DashboardComponent,
    HomeComponent,
    VehiclesComponent,
    GetshipmentofvehicleComponent,
    TransporterviewComponent,
    GetvehicleshipmentitemsComponent,
    GetallshipmentsComponent,
    ShipmentsComponent,
    InvoicesComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(transporterRoutes)
  ]
})
export class TransporterModule { }
