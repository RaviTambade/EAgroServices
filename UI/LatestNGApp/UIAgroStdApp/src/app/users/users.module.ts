import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserprofileComponent } from './userprofile/userprofile.component';
import { CorporatedetailsComponent } from './corporatedetails/corporatedetails.component';



@NgModule({
  declarations: [
    UserprofileComponent,
    CorporatedetailsComponent
  ],
  imports: [
    CommonModule
  ]
})
export class UsersModule { }
