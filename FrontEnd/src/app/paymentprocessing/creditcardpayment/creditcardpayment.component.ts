import { Component } from '@angular/core';
import { Cardpayment } from '../cardpayment';
import { Creditcardpayment } from '../creditcardpayment';
import { Payment } from '../payment';
import { PaymentService } from '../payment.service';

@Component({
  selector: 'app-creditcardpayment',
  templateUrl: './creditcardpayment.component.html',
  styleUrls: ['./creditcardpayment.component.css']
})
export class CreditcardpaymentComponent {
  cardPayment:Cardpayment |any;
  payment:Payment |any;
  // creditCardPayment:Creditcardpayment={
  //   cardPayment: this.cardPayment,
  //   payment: this.payment
  // }
  creditCardPayment:Creditcardpayment |any;

  status:boolean | undefined;
  constructor(private svc:PaymentService){
    this.creditCardPayment=
    {
      cardPayment:
      {
          accountId:2,
          cardNumber:"8778565645457878",
          amount:2000
      },
      payment:
      {
          billId:45
      }
  } 
  }
ngOnInit(){
}

Pay(){
  this.svc.payWithCard(this.creditCardPayment).subscribe((response)=>{
    console.log(this.creditCardPayment)
    console.log("---")
    console.log(response)
    return this.status=response;
  }
)}
}
