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
  vendor:Vendor |any;
  vehicle:Vehicle |any;
  vehicles:Vehicle[] |any;
  selectedVendor: any;
  insertStatus:boolean |undefined;
  constructor(private svc:VendorService,private route:ActivatedRoute){}
  ngOnInit(): void {
    const vendorId=this.route.snapshot.paramMap.get('vendorId');
    this.svc.getVendorVehicles(vendorId).subscribe((response)=>{
      this.vehicles=response
      console.log(this.vehicles)
    })
  }

   
}

