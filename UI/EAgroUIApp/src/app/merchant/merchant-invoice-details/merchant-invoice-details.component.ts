import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/Shared/users/user.service';
import { CorporateService } from 'src/app/corporate.service';
import { InvoicesService } from 'src/app/invoices.service';
import { InvoiceDetails } from '../invoice-details';

@Component({
  selector: 'app-merchant-invoice-details',
  templateUrl: './merchant-invoice-details.component.html',
  styleUrls: ['./merchant-invoice-details.component.css']
})
export class MerchantInvoiceDetailsComponent implements OnInit {
  invoiceId: string | any;
  invoiceDetails!: InvoiceDetails;

  constructor(private invoicesvc: InvoicesService, private corpsvc: CorporateService, private usrsvc: UserService,
    private route: ActivatedRoute, private router: Router) { }


  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.invoiceId = params.get('invoiceid');
    });

    this.invoicesvc.getInvoiceDetails(this.invoiceId).subscribe((res) => {
      this.invoiceDetails = res;

      const ids: number[] = [this.invoiceDetails.collectionCenterId, this.invoiceDetails.transporterId];
      const idString = ids.join(',');

      this.corpsvc.getCorporates(idString).subscribe((names: any[]) => {
        console.log("🚀 ~ this.corpsvc.getCorporates ~ names:", names);
        this.invoiceDetails.collectionCenterName = names[0].name
        this.invoiceDetails.transporterName = names[1].name

      });

    const farmerId: string = this.invoiceDetails.farmerId.toString();
    this.usrsvc.getUserNamesWithId(farmerId).subscribe((response: any[]) => {
      this.invoiceDetails.farmerName = response[0].name
    });

  });
}

}
