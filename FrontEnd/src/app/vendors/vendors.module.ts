import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VendorvehiclesComponent } from './vendorvehicles/vendorvehicles.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GridlistComponent } from './gridlist/gridlist.component';
import { PaginationComponent } from './pagination/pagination.component';
import { ListsortComponent } from './listsort/listsort.component';
import { ListdetailsComponent } from './listdetails/listdetails.component';



@NgModule({
  declarations: [
    VendorvehiclesComponent,
    GridlistComponent,
    PaginationComponent,
    ListsortComponent,
    ListdetailsComponent
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
    PaginationComponent,
    ListsortComponent,
    ListdetailsComponent
  ]
})
export class VendorsModule { }
