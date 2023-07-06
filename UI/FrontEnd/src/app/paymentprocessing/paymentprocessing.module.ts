import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreditcardpaymentComponent } from './creditcardpayment/creditcardpayment.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    CreditcardpaymentComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule
  ],
  exports:[
    CreditcardpaymentComponent
  ]
})
export class PaymentprocessingModule { }
