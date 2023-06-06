import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VendorvehiclesComponent } from './vendorvehicles/vendorvehicles.component';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    VendorvehiclesComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule

  ],
  exports:[
    VendorvehiclesComponent,
  ]
})
export class VendorsModule { }
