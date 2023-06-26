import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterbycontainerComponent } from './filterbycontainer/filterbycontainer.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CollectionService } from '../spa/collection.service';
import { FilterbydateComponent } from './filterbydate/filterbydate.component';



@NgModule({
  declarations: [
    FilterbycontainerComponent,
    FilterbydateComponent
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
