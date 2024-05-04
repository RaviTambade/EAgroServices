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
              private corporate:CorporateService,
              private managersvc: CollectionmanagerService,) { }
  ngOnInit(): void {

    this.collection.getCollectionCenterId().subscribe((collectionCenterId) => {
      console.log(collectionCenterId)
      this.invoicesvc.getCollectionCenterInvoices(collectionCenterId).subscribe((res) => {
        this.invoice = res;
        console.log(collectionCenterId);
        console.log(res);

        let distinctFarmerIds = this.invoice.map(item => item.farmerId)
        .filter((number, index, array) => array.indexOf(number) === index);

      let farmerIdString = distinctFarmerIds.join(',');

      this.managersvc.getUser(farmerIdString).subscribe((names) => {
        let farmerName = names
        console.log(farmerName)
        this.invoice.forEach(item => {
          let matchingItem = farmerName.find(element => element.id === item.farmerId);
          if (matchingItem != undefined)
            item.farmerName = matchingItem.fullName;
        
      
               
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
