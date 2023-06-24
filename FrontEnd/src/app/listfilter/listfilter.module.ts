import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterbycontainerComponent } from './filterbycontainer/filterbycontainer.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CollectionService } from '../spa/collection.service';



@NgModule({
  declarations: [
    FilterbycontainerComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports:[
    FilterbycontainerComponent
  ],
  providers:[
    CollectionService
  ]
})
export class ListfilterModule { }
