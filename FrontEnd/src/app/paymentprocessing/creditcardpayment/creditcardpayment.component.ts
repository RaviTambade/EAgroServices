import { Component } from '@angular/core';
import { Cardpayment } from '../cardpayment';
import { PaymentService } from '../payment.service';

@Component({
  selector: 'app-creditcardpayment',
  templateUrl: './creditcardpayment.component.html',
  styleUrls: ['./creditcardpayment.component.css']
})
export class CreditcardpaymentComponent {
  cardPayment:Cardpayment ={
    cardNumber: '',
    accountId: 2,
    amount: 1000
  };
  status:boolean | undefined;
  constructor(private svc:PaymentService){}
ngOnInit(){}

Pay(){
  this.svc.payWithCard(this.cardPayment).subscribe((response)=>{
    console.log("---")
    console.log(response)
    return this.status=response;
  }
)}
}
