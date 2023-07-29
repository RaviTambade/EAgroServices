import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CropsdetailsComponent } from './cropsdetails/cropsdetails.component';



@NgModule({
  declarations: [
    CropsdetailsComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    CropsdetailsComponent
  ]
})
export class CropModule { }
