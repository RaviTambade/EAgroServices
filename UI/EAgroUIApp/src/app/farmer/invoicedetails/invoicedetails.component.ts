import { Component, OnInit } from '@angular/core';
import { FarmerService } from '../farmer.service';
import { ActivatedRoute } from '@angular/router';
import { Invoice } from 'src/app/merchant/invoice';
import { InvoiceDetails } from 'src/app/merchant/invoice-details';

@Component({
  selector: 'app-invoicedetails',
  templateUrl: './invoicedetails.component.html',
  styleUrls: ['./invoicedetails.component.css']
})
export class InvoicedetailsComponent implements OnInit{
  collectionId:any;
  invoice:InvoiceDetails={
    id: 0,
    farmerId: 0,
    farmerName: '',
    cropName: '',
    quantity: 0,
    paymentStatus: '',
    ratePerKg: 0,
    invoiceDate: '',
    collectionCenterCorporateId: 0,
    collectionCenterName: '',
    transporterCorporateId: 0,
    collectionId: 0,
    transporterName: '',
    vehicleNumber: '',
    grade: '',
    containerType: '',
    totalWeight: 0,
    netWeight: 0,
    freightCharges: 0,
    labourCharges: 0,
    serviceCharges: 0,
    farmerAmount: 0
  };
  constructor(private svc:FarmerService,private route:ActivatedRoute){}

  
ngOnInit() {
  this.route.paramMap.subscribe(params => {
    this.collectionId = params.get('id');
  });
  this.svc.getCollectionInvoice(this.collectionId).subscribe((response)=>{
    this.invoice=response;
    console.table(response);
  })
}
}
