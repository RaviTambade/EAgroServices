import { Component, OnInit } from '@angular/core';
import { Transporterinvoice } from 'src/app/Models/transporterinvoice';
import { CorporateService } from 'src/app/Services/corporate.service';
import { TransporterService } from 'src/app/Services/transporter.service';

@Component({
  selector: 'app-transporterinvoices',
  templateUrl: './transporterinvoices.component.html',
  styleUrls: ['./transporterinvoices.component.css']
})
export class TransporterinvoicesComponent implements OnInit {
  transporterInvoices: Transporterinvoice[] = []
  paidStatus: boolean = false;
  companyName: string | undefined
  constructor(private transportSvc: TransporterService,
    private crpSvc: CorporateService) { }
  ngOnInit(): void {

  }
  fetchData(status: string) {
    this.transportSvc.getTransporterInvoices(status).subscribe((res) => {
      this.transporterInvoices = res
      console.log(res)
      if (this.transporterInvoices.length != 0) {

        let corporateIds = this.transporterInvoices.map(item => item.corporateId)
          .filter((number, index, array) => array.indexOf(number) === index);

        let corporateIdString = corporateIds.join(',');

        this.crpSvc.getCorporates(corporateIdString).subscribe((names) => {
          console.log(names)
          let corporationNames = names
          this.transporterInvoices.forEach(item => {
            let matchingItem = corporationNames.find(element => element.id === item.corporateId);
            if (matchingItem != undefined)
              item.companyName = matchingItem.name;
            console.log(matchingItem)
          });
        });
      }
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
