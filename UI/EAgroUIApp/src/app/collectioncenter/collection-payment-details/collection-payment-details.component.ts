import { Component, Input, OnInit } from '@angular/core';
import { CollectionCenterInvoiceDetails } from 'src/app/Models/collection-center-invoice-details';
import { NameId } from 'src/app/Models/name-id';
import { CorporateService } from 'src/app/Services/corporate.service';
import { InvoicesService } from 'src/app/Services/invoices.service';
import { UserService } from 'src/app/Shared/users/user.service';


@Component({
  selector: 'app-collection-payment-details',
  templateUrl: './collection-payment-details.component.html',
  styleUrls: ['./collection-payment-details.component.css']
})
export class CollectionPaymentDetailsComponent implements OnInit {
  @Input() invoiceId: number | undefined;
  invoiceDetails!: CollectionCenterInvoiceDetails

  constructor(
    private invoicesvc: InvoicesService,
    private corporatesvc: CorporateService,
    private usersvc: UserService) { }

  ngOnInit(): void {
    if (!this.invoiceId) {
      console.error('Invoice ID is undefined.');
      return;
    }
    this.invoicesvc.getCollectionCenterInvoicDetails(this.invoiceId).subscribe((res) => {
      this.invoiceDetails = res;

      let ids: number[] = [this.invoiceDetails.merchantCorporateId, this.invoiceDetails.transporterCorporateId];
      let idString = ids.join(',');


      this.corporatesvc.getCorporates(idString).subscribe((names: NameId[]) => {
        this.invoiceDetails.merchantName = names[0].name
        this.invoiceDetails.transporterName = names[1].name

      });

      let farmerId: string = this.invoiceDetails.farmerId.toString();
      this.usersvc.getUserNamesWithId(farmerId).subscribe((response) => {
        this.invoiceDetails.farmerName = response[0].name
      });

    });

  }



}
