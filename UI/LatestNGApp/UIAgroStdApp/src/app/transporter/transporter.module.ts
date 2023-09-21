import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { VehiclesComponent } from './vehicles/vehicles.component';
import { GetshipmentofvehicleComponent } from './getshipmentofvehicle/getshipmentofvehicle.component';
import { TransporterviewComponent } from './transporterview/transporterview.component';


export const transporterRoutes:Routes=[
  {path:'dashboard',component:DashboardComponent},
  {path:'transporterview',component:TransporterviewComponent},
  {path:'dashboard',component:DashboardComponent},
  { path: 'getshipmentofvehicle/:vehicleId', component: GetshipmentofvehicleComponent }

]

@NgModule({
  declarations: [
    DashboardComponent,
    HomeComponent,
    VehiclesComponent,
    GetshipmentofvehicleComponent,
    TransporterviewComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(transporterRoutes)
  ]
})
export class TransporterModule { }
