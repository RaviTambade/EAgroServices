import { Component, OnInit } from '@angular/core';
import { Invoice } from 'src/app/Models/invoice';
import { InvoicesService } from 'src/app/Services/invoices.service';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.css']
})
export class InvoicesComponent implements OnInit {

  invoices: Invoice[] = [];
  selectedInvoiceId: number | null = null;
  paidStatus: boolean = false;

  constructor(
    private invoicesvc: InvoicesService,
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
    this.invoicesvc.getmerchantIdByUserId().subscribe((merchantId)=>{
    this.invoicesvc.getInvoices(merchantId,status).subscribe((response) => {
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
  })
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
