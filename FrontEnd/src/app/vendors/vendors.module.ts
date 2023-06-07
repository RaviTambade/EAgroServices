import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VendorvehiclesComponent } from './vendorvehicles/vendorvehicles.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    VendorvehiclesComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule

  ],
  exports:[
    VendorvehiclesComponent,
  ]
})
export class VendorsModule { }
