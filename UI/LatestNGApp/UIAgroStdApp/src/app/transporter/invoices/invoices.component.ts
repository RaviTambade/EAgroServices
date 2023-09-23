import { Component, OnInit } from '@angular/core';
import { Transporterinvoice } from 'src/app/Models/transporterinvoices';
import { CorporateService } from 'src/app/Services/corporate.service';
import { TransporterService } from 'src/app/Services/transporter.service';

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.css']
})
export class InvoicesComponent implements OnInit {
   transporterInvoices: Transporterinvoice[] = [];
  paidStatus: boolean = true;
  unpaidStatus: boolean = false;
  showTable = false;
  allInvoices = [];
// transporterInvoices = this.allInvoices.filter(invoice => invoice.paymentStatus === 'Paid');

  companyName: string | undefined;
  constructor(
    private transportSvc: TransporterService,
    private crpSvc: CorporateService
  ) {}
  ngOnInit(): void {
  this.onClickPaid()
  }
  fetchData(status: string) {
    this.transportSvc.gettransporterIdByUserId().subscribe((transporterId)=>{
    this.transportSvc.getTransporterInvoices(status,transporterId).subscribe((res) => {
      this.transporterInvoices = res;
      console.log(res);
      if (this.transporterInvoices.length != 0) {
        let corporateIds = this.transporterInvoices
          .map((item) => item.corporateId)
          .filter((number, index, array) => array.indexOf(number) === index);

        let corporateIdString = corporateIds.join(',');

        this.crpSvc.getCorporates(corporateIdString).subscribe((names) => {
          console.log(names);
          let corporationNames = names;
          this.transporterInvoices.forEach((item) => {
            let matchingItem = corporationNames.find(
              (element) => element.id === item.corporateId
            );
            if (matchingItem != undefined) item.companyName = matchingItem.name;
            console.log(matchingItem);
          });
        });
      }
      })
    })
  
}
  onClickPaid() {
    this.paidStatus = true;
    this.showTable = true;
    this.fetchData('paid');
  }

  onClickUnpaid() {
    this.paidStatus = false;
    this.showTable = true;
    this.fetchData('unpaid');
  }


}