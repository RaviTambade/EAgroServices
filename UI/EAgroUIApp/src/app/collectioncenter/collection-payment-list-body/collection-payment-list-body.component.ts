import { Component, Input } from '@angular/core';
import { Invoice } from 'src/app/merchant/invoice';

@Component({
  selector: 'app-collection-payment-list-body',
  templateUrl: './collection-payment-list-body.component.html',
  styleUrls: ['./collection-payment-list-body.component.css']
})
export class CollectionPaymentListBodyComponent {
 @Input() invoice!:Invoice;
 detailsStatus: boolean=false;

 onClickInvoiceDetails() {
  if(this.detailsStatus==true)
  this.detailsStatus=false;
 else if(this.detailsStatus==false)
  this.detailsStatus=true;
}

onClickClose(){
  this.detailsStatus=false;
}
}
