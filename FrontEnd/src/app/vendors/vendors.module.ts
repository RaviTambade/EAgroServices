import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VendorvehiclesComponent } from './vendorvehicles/vendorvehicles.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GridlistComponent } from './gridlist/gridlist.component';
import { PaginationComponent } from './pagination/pagination.component';
import { VehicledetailsComponent } from './vehicledetails/vehicledetails.component';
import { VendorService } from './vendor.service';
import { ActivatedRoute } from '@angular/router';



@NgModule({
  declarations: [
    VendorvehiclesComponent,
    GridlistComponent,
    PaginationComponent,
    VehicledetailsComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    

  ],
  exports:[
    VendorvehiclesComponent,
    GridlistComponent,
    PaginationComponent,
    VehicledetailsComponent
  ],
  providers:[
VendorService,
  ]
})
export class VendorsModule { }
