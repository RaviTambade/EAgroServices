import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VendorvehiclesComponent } from './vendorvehicles/vendorvehicles.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GridlistComponent } from './gridlist/gridlist.component';
import { PaginationComponent } from './pagination/pagination.component';



@NgModule({
  declarations: [
    VendorvehiclesComponent,
    GridlistComponent,
    PaginationComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule

  ],
  exports:[
    VendorvehiclesComponent,
    GridlistComponent,
    PaginationComponent
  ]
})
export class VendorsModule { }
