import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransportNavLeftComponent } from './transport-nav-left/transport-nav-left.component';
import { ProfileComponent } from './profile/profile.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TransportdashboardComponent } from './transportdashboard/transportdashboard.component';
import { GoogleChartsModule } from 'angular-google-charts';
import { TransportdetailsComponent } from './transportdetails/transportdetails.component';



@NgModule({
  declarations: [
    TransportNavLeftComponent,
    ProfileComponent,
    TransportdashboardComponent,
    TransportdetailsComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    GoogleChartsModule
  ]
})
export class TransportModule { }
