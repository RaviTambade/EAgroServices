import { Component, OnInit } from '@angular/core';
import { FarmerService } from '../farmer.service';
import { ActivatedRoute } from '@angular/router';
import { Invoice } from 'src/app/merchant/invoice';
import { InvoiceDetails } from 'src/app/merchant/invoice-details';
import { Farmerinvoice } from '../farmerinvoice';
import { CorporateService } from 'src/app/corporate.service';

@Component({
  selector: 'app-invoicedetails',
  templateUrl: './invoicedetails.component.html',
  styleUrls: ['./invoicedetails.component.css']
})
export class InvoicedetailsComponent implements OnInit{
  collectionId:any;
  collectionCenterCorporateId:any;
   invoices:Farmerinvoice[]=[];
  invoice:Farmerinvoice={
    cropName: '',
    quantity: 0,
    paymentStatus: '',
    ratePerKg: 0,
    invoiceDate: '',
    collectionCenterCorporateId: 0,
    collectionCenterName: '',
    transporterCorporateId: 0,
    transporterName: '',
    vehicleNumber: '',
    grade: '',
    containerType: '',
    totalWeight: 0,
    netWeight: 0,
    freightCharges: 0,
    labourCharges: 0,
    serviceCharges: 0,
    farmerAmount: 0,
    merchantCorporateId: 0,
    merchantName: ''
  };
  collectionCenterName: any;
  transporterName:any;
  transporterCorporateId: any;
  merchantCorporateId:any;
  merchantName:any;
  constructor(private svc:FarmerService,private route:ActivatedRoute,private crpSvc:CorporateService){}

  
ngOnInit() {
  this.route.paramMap.subscribe(params => {
    this.collectionId = params.get('id');
  })
  this.svc.getCollectionInvoice(this.collectionId).subscribe((response)=>{
    this.invoice=response;
    console.table(response);
    this.collectionCenterCorporateId=response.collectionCenterCorporateId;
    this.merchantCorporateId=response.merchantCorporateId;
    this.transporterCorporateId=response.transporterCorporateId;

this.crpSvc.getCorporates(this.collectionCenterCorporateId).subscribe((names) => {
  let corporationNames = names
  console.log(names)
  this.collectionCenterName=corporationNames.map(i=>i.name)
  console.log(this.collectionCenterName)
   this.invoices.forEach(item => {
    let matchingItem = corporationNames.find(element => element.id === item.collectionCenterCorporateId);
    console.log(matchingItem)
   if (matchingItem != undefined){
       item.collectionCenterName = matchingItem.name;
   console .log(matchingItem)

   }
  })
})

this.crpSvc.getCorporates(this.transporterCorporateId).subscribe((names) => {
  let corporationNames = names
  console.log(names)
  this.transporterName=corporationNames.map(i=>i.name)
  console.log(this.transporterName)
   this.invoices.forEach(item => {
    let matchingItem = corporationNames.find(element => element.id === item.transporterCorporateId);
    console.log(matchingItem)
   if (matchingItem != undefined){
       item.transporterName = matchingItem.name;
   console .log(matchingItem)
}
   })
  })
  this.crpSvc.getCorporates(this.merchantCorporateId).subscribe((names) => {
    let corporationNames = names
    console.log(names)
    this.merchantName=corporationNames.map(i=>i.name)
     this.invoices.forEach(item => {
      let matchingItem = corporationNames.find(element => element.id === item.merchantCorporateId);
      console.log(matchingItem)
     if (matchingItem != undefined){
         item.merchantName = matchingItem.name;
     console .log(matchingItem)
}
})
})
})
}
}




