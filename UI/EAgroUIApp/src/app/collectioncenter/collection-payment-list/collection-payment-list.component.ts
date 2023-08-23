import { Component, Input } from '@angular/core';
import { Invoice } from 'src/app/Models/invoice';


@Component({
  selector: 'collectioncenter-collection-payment-list',
  templateUrl: './collection-payment-list.component.html',
  styleUrls: ['./collection-payment-list.component.css']
})
export class CollectionPaymentListComponent {
  @Input()invoices!: Invoice[] ;
  selectedInvoiceId: number | null = null;




  onClickClose() {
    this.selectedInvoiceId = null;
  }
  onClickInvoiceDetails(invoiceId: number) {
    if (this.selectedInvoiceId === invoiceId) {
      this.selectedInvoiceId = null;
    } else {
      this.selectedInvoiceId = invoiceId;
    }
  }
}
