import { getLocaleWeekEndRange } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { CorporateService } from 'src/app/corporate.service';
import { TransporterService } from '../transporter.service';
import { VehicleCorporateShipment } from '../vehicle-corporate-shipment';

@Component({
  selector: 'app-getallshipments',
  templateUrl: './getallshipments.component.html',
  styleUrls: ['./getallshipments.component.css']
})
export class GetallshipmentsComponent implements OnInit{
  transporterId:any
  currentPage = 0;
arrLenght = 0;
vehicleCorporateshipment:VehicleCorporateShipment;
vehicleCorporateshipments:VehicleCorporateShipment[]
constructor(private svc:TransporterService,private crpSvc:CorporateService,private router:Router){
  this.vehicleCorporateshipment={
    shipmentId: 0,
    vehicleId: 0,
    corporateId: 0,
    vehicleType: '',
    rtoNumber: '',
    kilometers: '',
    status: '',
    shipmentDate: '',
    companyName: ''
  }
  this.vehicleCorporateshipments=[]
  this.arrLenght = this.vehicleCorporateshipments.length
}

  ngOnInit(): void {
    this.transporterId=localStorage.getItem("transporterId");
   this.svc.getAllShipmentsOfTransporter(this.transporterId).subscribe((response)=>{
    this.vehicleCorporateshipments=response
    // let distinctmerchantIds = this.vehicleCorporateshipments.map(item => item.merchantId)
    // .filter((number, index, array) => array.indexOf(number) === index);
    let corporateIds = this.vehicleCorporateshipments.map(item => item.corporateId)
    .filter((number, index, array) => array.indexOf(number) === index);
    
// let merchantIdString = distinctmerchantIds.join(',');
let crpId = corporateIds.join(',');
console.log(crpId)
// console.log(merchantIdString)
      // this.svc.getCorporateId(shipment.merchantId).subscribe((corporateId: string) => {
        this.crpSvc.getCorporates(crpId).subscribe((names) => {
          console.log(names)
          let corporationNames = names
          this.vehicleCorporateshipments.forEach(item => {
            let matchingItem = corporationNames.find(element => element.id === item.corporateId);
            if (matchingItem != undefined)
              item.companyName = matchingItem.name;
              console.log(matchingItem)
          });
        });
    // });
});
  }
  onClickShipmentDetails(shipment: VehicleCorporateShipment) {
    localStorage.setItem('selectedShipment', JSON.stringify(shipment));
    // this.router.navigate(['transporter', shipment.vehicleId, 'shipmentdetails', shipment.id]);
    console.log(shipment.shipmentId)
  }
  // get getItems(): any[] {
  //   const startindex = this.currentPage * 5;
  //   const endindex = startindex + 5;
  //   return this.vehicleCorporateshipments.slice(startindex, endindex);  
  // }
  // next() {
  //   this.currentPage++;
  // }
  // hasNextPage(): boolean {
  //   const totalpages = Math.trunc(this.arrLenght / 5);
  //   console.log("🚀 ~ hasnextPage ~ totalpages:", totalpages);
   
  //   if(this.arrLenght %5 ==0){
  //     return this.currentPage < totalpages-1;
  //   }

  //   if (this.currentPage < totalpages ) {
  //     return true;
  //   }
  //   return false;
  // }
  // hasPreviousPage(): boolean {
  //   return this.currentPage != 0;
  // }
  // previous() {
  //   this.currentPage--;
  // }
}
