import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UpdateAccountComponent } from './update-account/update-account.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import { DetailsComponent } from './details/details.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    UpdateAccountComponent,
    CreateAccountComponent,
    DetailsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule
  ],
  exports: [
    CreateAccountComponent,
    UpdateAccountComponent,
    DetailsComponent
  ]
})
export class AccountManagerModule { }
