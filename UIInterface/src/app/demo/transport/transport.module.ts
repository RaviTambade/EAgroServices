import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransportNavLeftComponent } from './transport-nav-left/transport-nav-left.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TransportdashboardComponent } from './transportdashboard/transportdashboard.component';
import { GoogleChartsModule } from 'angular-google-charts';
import { TransportdetailsComponent } from './transportdetails/transportdetails.component';
import { TransportprofileComponent } from './transportprofile/transportprofile.component';
import { TransportupdateComponent } from './transportupdate/transportupdate.component';
import { TransportlogoutComponent } from './transportlogout/transportlogout.component';
import { ColumnchartComponent } from './transportdashboard/columnchart/columnchart.component';
import { PiechartComponent } from './transportdashboard/piechart/piechart.component';
import { TransportTruckComponent } from './transport-truck/transport-truck.component';



@NgModule({
  declarations: [
    TransportNavLeftComponent,
    TransportdashboardComponent,
    TransportdetailsComponent,
    TransportprofileComponent,
    TransportupdateComponent,
    TransportlogoutComponent,
    ColumnchartComponent,
    PiechartComponent,
    TransportTruckComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    GoogleChartsModule
  ]
})
export class TransportModule { }
