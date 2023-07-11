import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UpdateLocationComponent } from './update-location/update-location.component';
import { AddLocationComponent } from './add-location/add-location.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    UpdateLocationComponent,
    AddLocationComponent
  ],
  imports: [
    CommonModule,
    FormsModule, 
    HttpClientModule
  ],
  exports: [
    UpdateLocationComponent,
    AddLocationComponent
  ]
})
export class LocationModule { }
