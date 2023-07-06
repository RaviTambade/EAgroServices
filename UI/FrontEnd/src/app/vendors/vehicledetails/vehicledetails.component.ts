import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Vehicle } from '../vehicle';
import { Vendor } from '../vendor';
import { VendorService } from '../vendor.service';

@Component({
  selector: 'app-vehicledetails',
  templateUrl: './vehicledetails.component.html',
  styleUrls: ['./vehicledetails.component.css']
})
export class VehicledetailsComponent implements OnInit {
  vendors:Vendor |any;
  vehicle:Vehicle |any;
  vehicles:Vehicle[] |any;
  selectedVendor: any;
  insertStatus:boolean |undefined;
  vendorId: any;
  
  constructor(private svc:VendorService){}
  
  ngOnInit(): void { 
this.svc.getVendors().subscribe((responce)=>{
  this.vendors=responce;
  console.log(responce);
})
  }
  
onclick(){
    this.svc.getVendorVehicles(this.vendorId).subscribe((response)=>{
      this.vehicles=response
      console.log(this.vehicles)
    })
  }
  }
   


