import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterbycontainerComponent } from './filterbycontainer/filterbycontainer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CollectionService } from '../spa/collection.service';
import { FilterbydateComponent } from './filterbydate/filterbydate.component';
import { FilterbycropComponent } from './filterbycrop/filterbycrop.component';



@NgModule({
  declarations: [
    FilterbycontainerComponent,
    FilterbydateComponent,
    FilterbycropComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports:[
    FilterbycontainerComponent,
    FilterbydateComponent,
    FilterbycropComponent
  ],
  providers:[
    CollectionService
  ]
})
export class ListfilterModule { }
