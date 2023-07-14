import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/Shared/users/user.service';
import { CorporateService } from 'src/app/corporate.service';
import { InvoicesService } from 'src/app/invoices.service';
import { Invoice } from '../invoice';

@Component({
  selector: 'merchant-invoices',
  templateUrl: './merchant-invoices.component.html',
  styleUrls: ['./merchant-invoices.component.css']
})
export class MerchantInvoicesComponent implements OnInit {

  invoices: Invoice[] = [];

  constructor(private invoicesvc: InvoicesService, private corpsvc: CorporateService, private usrsvc: UserService,
    private route: ActivatedRoute, private router: Router) { }


  ngOnInit(): void {
    this.invoicesvc.getInvoices().subscribe((response) => {
      this.invoices = response;


      let distinctfarmerIds = this.invoices.map(item => item.farmerId)
        .filter((number, index, array) => array.indexOf(number) === index);

      let farmerIdString = distinctfarmerIds.join(',');
      this.usrsvc.getUserNamesWithId(farmerIdString).subscribe((names) => {
        let farmerNames: any[] = names
        this.invoices.forEach(item => {
          let matchingItem = farmerNames.find(element => element.id === item.farmerId);
          item.farmerName = matchingItem.name;
        });
      });
    });

  }
  onClickInvoiceDetails(invoiceId: number) {
    this.router.navigate(['/merchant/invoicedetails', invoiceId]);
  }

}
