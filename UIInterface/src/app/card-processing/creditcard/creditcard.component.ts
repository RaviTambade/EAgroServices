import { Component, OnInit } from '@angular/core';
import { CardService } from '../card.service';
import { Cardpayment } from '../cardpayment';

@Component({
  selector: 'app-creditcard',
  templateUrl: './creditcard.component.html',
  styleUrls: ['./creditcard.component.scss']
})
export class CreditcardComponent {
  cardPayment:Cardpayment ={
    cardNumber: '',
    accountId: 2,
    amount: 1000
  };
  status:boolean;
  constructor(private svc:CardService){}
ngOnInit(){}

Pay(){
  this.svc.payWithCard(this.cardPayment).subscribe((response)=>{
    console.log(response)
    return this.status=response;
 
  }
)}
}
         

