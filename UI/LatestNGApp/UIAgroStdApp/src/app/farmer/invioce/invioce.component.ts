import { Component, Input } from '@angular/core';
import { Farmerinvoice } from 'src/app/Models/farmerinvoice';
import { CommonService } from 'src/app/Services/Common.service';
import { InvoiceService } from 'src/app/Services/invoice.service';

@Component({
  selector: 'app-invioce',
  templateUrl: './invioce.component.html',
  styleUrls: ['./invioce.component.css']
})
export class InvioceComponent {
  @Input() collectionId!: number;
  invoice: Farmerinvoice | undefined;
  collectionCenterCorporateId: any;
  collectionCenterName: string | undefined;
  constructor(private svc: InvoiceService, private commonSvc: CommonService) { }
  ngOnInit() {
    console.log(this.collectionId)
    this.svc.getCollectionInvoice(this.collectionId).subscribe((response) => {
      this.invoice = response;
      console.table(this.collectionId);
      this.commonSvc.getCorporates(response.collectionCenterCorporateId).subscribe((response) => {
        console.log(this.collectionCenterCorporateId);
        this.collectionCenterName = response[0].name
        console.log(response);
      })
    })
  }
}







