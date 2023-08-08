import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { RouterModule, Routes } from '@angular/router';
import { VehiclesoftransporterComponent } from './vehiclesoftransporter/vehiclesoftransporter.component';
import { GetshipmentsofvehicleComponent } from './getshipmentsofvehicle/getshipmentsofvehicle.component';
import { CorporateService } from '../corporate.service';
import { AddnewvehicleComponent } from './addnewvehicle/addnewvehicle.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GetvehicleshipmentitemsComponent } from './getvehicleshipmentitems/getvehicleshipmentitems.component';
import { GetallshipmentsComponent } from './getallshipments/getallshipments.component';
import { TransporterbarchartComponent } from './transporterbarchart/transporterbarchart.component';
import { NgChartsModule } from 'ng2-charts';
import { TransporterdashboardComponent } from './transporterdashboard/transporterdashboard.component';
import { TransporterpiechartComponent } from './transporterpiechart/transporterpiechart.component';
import { TransporterlinechartComponent } from './transporterlinechart/transporterlinechart.component';
import { CorporatedetailsDirective } from './corporatedetails.directive';
import { UpdatevehicleComponent } from './updatevehicle/updatevehicle.component';

export const transporterRoutes: Routes = [
  { path: 'home/:id', component: HomeComponent },
  { path: 'vehicles', component: VehiclesoftransporterComponent },
  {path:'shipments/:id',component: GetshipmentsofvehicleComponent},
  {path:'update/:id',component: UpdatevehicleComponent},
    {path:'addvehicle',component:AddnewvehicleComponent},
    {path:'shipmentdetails/:id',component:GetvehicleshipmentitemsComponent},
    {path:'allshipments',component:GetallshipmentsComponent},
    {path:'dashboard',component:TransporterdashboardComponent}
]


@NgModule({
  declarations: [
    HomeComponent,
    VehiclesoftransporterComponent,
    GetshipmentsofvehicleComponent,
    AddnewvehicleComponent,
    GetvehicleshipmentitemsComponent,
    GetallshipmentsComponent,
    TransporterbarchartComponent,
    TransporterdashboardComponent,
    TransporterpiechartComponent,
    TransporterlinechartComponent,
    CorporatedetailsDirective,
    UpdatevehicleComponent,

  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(transporterRoutes),
    NgChartsModule
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
