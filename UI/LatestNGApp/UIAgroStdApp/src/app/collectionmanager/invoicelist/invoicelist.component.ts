import { Component, OnInit } from '@angular/core';
import { Invoice } from 'src/app/Models/invoice';
import { CollectionmanagerService } from 'src/app/Services/collectionmanager.service';
import { CorporateService } from 'src/app/Services/corporate.service';
import { InvoiceService } from 'src/app/Services/invoice.service';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-invoicelist',
  templateUrl: './invoicelist.component.html',
  styleUrls: ['./invoicelist.component.css']
})
export class InvoicelistComponent implements OnInit {
  invoice: Invoice[] = [];
  farmerName: string = '';
  merchantName: string = '';
  constructor(private invoicesvc: InvoiceService,
              private collection: CollectionmanagerService,
              private user:UserService,
              private corporate:CorporateService) { }
  ngOnInit(): void {

    this.collection.getCollectionCenterId().subscribe((collectionCenterId) => {
      this.invoicesvc.getCollectionCenterInvoices(collectionCenterId).subscribe((res) => {
        this.invoice = res;
        console.log(res);

        let distinctfarmerIds = this.invoice.map(item => item.farmerId)
        .filter((number, index, array) => array.indexOf(number) === index);
      let farmerIdString = distinctfarmerIds.join(',')
      this.user.getUserNamesWithId(farmerIdString).subscribe((names) => {
        let farmerNames = names
        this.invoice.forEach(item => {
          let matchingItem = farmerNames.find(element => element.id === item.farmerId);
          if (matchingItem != undefined)
            item.farmerName = matchingItem.name;
          console.log(farmerNames);
               
            let distinctcorporateIds = this.invoice.map(item => item.merchantCorporateId)
            .filter((number, index, array) => array.indexOf(number) === index);
          let corporateIdString = distinctcorporateIds.join(',')
          this.corporate.getCorporates(corporateIdString).subscribe((names) => {
            let corporationNames = names
            this.invoice.forEach(item => {
              let matchingItem = corporationNames.find(element => element.id === item.merchantCorporateId);
              if (matchingItem != undefined)
                item.merchantName = matchingItem.name;
      })
    })
  })
})
})
})
  }
  onClickInvoiceDetails(){

  }
}
