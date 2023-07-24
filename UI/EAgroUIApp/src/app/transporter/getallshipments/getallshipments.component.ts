import { getLocaleWeekEndRange } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TransporterService } from '../transporter.service';
import { VehicleCorporateShipment } from '../vehicle-corporate-shipment';

@Component({
  selector: 'app-getallshipments',
  templateUrl: './getallshipments.component.html',
  styleUrls: ['./getallshipments.component.css']
})
export class GetallshipmentsComponent implements OnInit{
  transporterId:any
vehicleCorporateshipment:VehicleCorporateShipment
vehicleCorporateshipments:VehicleCorporateShipment[]
constructor(private svc:TransporterService){
  this.vehicleCorporateshipment={
    corporateId: 0,
    vehicleType: '',
    rtoNumber: '',
    kilometers: '',
    status: '',
    shipmentDate: ''
  },
  this.vehicleCorporateshipments=[]
}
  ngOnInit(): void {
    this.transporterId=localStorage.getItem("transporterId");
   this.svc.getAllShipmentsOfTransporter(this.transporterId).subscribe((response)=>{
    this.vehicleCorporateshipments=response
   })
  }

}
