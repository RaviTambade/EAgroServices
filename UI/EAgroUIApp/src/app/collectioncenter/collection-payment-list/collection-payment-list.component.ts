import { Component } from '@angular/core';
import { InvoicesService } from 'src/app/invoices.service';
import { Invoice } from 'src/app/merchant/invoice';
import { UserService } from 'src/app/Shared/users/user.service';
import { CorporateService } from 'src/app/corporate.service';

@Component({
  selector: 'app-collection-payment-list',
  templateUrl: './collection-payment-list.component.html',
  styleUrls: ['./collection-payment-list.component.css']
})
export class CollectionPaymentListComponent {
  invoices: Invoice[] = [];

  constructor(private invoicesvc: InvoicesService, private corpsvc: CorporateService, private usrsvc: UserService) { }


  ngOnInit(): void {
    this.fetchData();
  }
 

  fetchData() {
    this.invoicesvc.getCollectionCenterInvoices().subscribe((response) => {
      this.invoices = response;

      if (this.invoices.length != 0) {

        let distinctfarmerIds = this.invoices.map(item => item.farmerId)
          .filter((number, index, array) => array.indexOf(number) === index);

        let farmerIdString = distinctfarmerIds.join(',');

        let distinctMerchantIds = this.invoices.map(item => item.merchantCorporateId)
          .filter((number, index, array) => array.indexOf(number) === index);

        let merchantIdString = distinctMerchantIds.join(',');

        this.corpsvc.getCorporates(merchantIdString).subscribe((names) => {
          let corporationNames = names
          this.invoices.forEach(item => {
            let matchingItem = corporationNames.find(element => element.id === item.merchantCorporateId);
            if (matchingItem != undefined)
              item.merchantName = matchingItem.name;
          });
        });

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
}
