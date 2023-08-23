import { Component, OnInit } from '@angular/core';
import { Invoice } from 'src/app/Models/invoice';
import { CorporateService } from 'src/app/Services/corporate.service';
import { InvoicesService } from 'src/app/Services/invoices.service';
import { UserService } from 'src/app/Shared/users/user.service';


@Component({
  selector: 'merchant-invoices',
  templateUrl: './merchant-invoices.component.html',
  styleUrls: ['./merchant-invoices.component.css']
})
export class MerchantInvoicesComponent implements OnInit {

  invoices: Invoice[] = [];
  selectedInvoiceId: number | null = null;
  paidStatus: boolean = false;

  constructor(
    private invoicesvc: InvoicesService,
    private corpsvc: CorporateService,
    private usrsvc: UserService) { }


  ngOnInit(): void {
    this.onClickUnpaid();
  }
  onClickInvoiceDetails(invoiceId: number) {
    if (this.selectedInvoiceId === invoiceId) {
      this.selectedInvoiceId = null;
    }
    else {
      this.selectedInvoiceId = invoiceId;
    }
  }

  fetchData(status: string) {
    this.invoicesvc.getInvoices(status).subscribe((response) => {
      this.invoices = response;

      if (this.invoices.length != 0) {

        let distinctfarmerIds = this.invoices.map(item => item.farmerId)
          .filter((number, index, array) => array.indexOf(number) === index);

        let farmerIdString = distinctfarmerIds.join(',');

        this.usrsvc.getUserNamesWithId(farmerIdString).subscribe((names) => {
          let farmerNames = names
          this.invoices.forEach(item => {
            let matchingItem = farmerNames.find(element => element.id === item.farmerId);
            if (matchingItem != undefined)
              item.farmerName = matchingItem.name;
          });
        });
      }
    });
  }

  onClickPaid() {
    this.paidStatus = true;
    this.fetchData("paid");
  }

  onClickUnpaid() {
    this.paidStatus = false;
    this.fetchData("unpaid");
  }

}
