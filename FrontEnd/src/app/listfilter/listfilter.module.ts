import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterbycontainerComponent } from './filterbycontainer/filterbycontainer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CollectionService } from '../spa/collection.service';
import { FilterbydateComponent } from './filterbydate/filterbydate.component';



@NgModule({
  declarations: [
    FilterbycontainerComponent,
    FilterbydateComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports:[
    FilterbycontainerComponent,
    FilterbydateComponent
  ],
  providers:[
    CollectionService
  ]
})
export class ListfilterModule { }
