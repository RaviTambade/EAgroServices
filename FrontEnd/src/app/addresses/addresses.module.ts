import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddAddressComponent } from './add-address/add-address.component';
import { UpdateAddressComponent } from './update-address/update-address.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AddAddressComponent,
    UpdateAddressComponent
  ],
  imports: [
    CommonModule,
    FormsModule, 
    HttpClientModule
     
  ],
  exports :[
    UpdateAddressComponent,
    AddAddressComponent
  ]
})
export class AddressesModule { }
