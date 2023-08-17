import { Component, Input } from '@angular/core';
import { InvoicesService } from 'src/app/invoices.service';
import { Invoice } from 'src/app/merchant/invoice';
import { UserService } from 'src/app/Shared/users/user.service';
import { CorporateService } from 'src/app/corporate.service';

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
