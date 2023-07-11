import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DebitCardComponent } from './debit-card/debit-card.component';
import { CreditCardComponent } from './credit-card/credit-card.component';
import { AccountComponent } from './account/account.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    DebitCardComponent,
    CreditCardComponent,
    AccountComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports : [
    AccountComponent
  ]
})
export class PaymentGatewayModule { }
