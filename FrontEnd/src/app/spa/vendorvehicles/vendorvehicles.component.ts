import { Component, OnInit } from '@angular/core';
import { VendorService } from '../vendor.service';
import { ActivatedRoute } from '@angular/router';
import { Vehicle } from 'src/app/vendors/vehicle';
import { Vendor } from 'src/app/vendors/vendor';

@Component({
  selector: 'app-vendorvehicles',
  templateUrl: './vendorvehicles.component.html',
  styleUrls: ['./vendorvehicles.component.css']
})
export class VendorvehiclesComponent implements OnInit{
  vehicles:Vehicle|any;
   vendor:Vendor|any;
  // transportId: any;
  vendorId:any;

constructor(private svc:VendorService,private route:ActivatedRoute){}
  ngOnInit(): void {
    this.vendorId=this.route.snapshot.paramMap.get('id')
    this.svc.getVendorVehicles(this.vendorId).subscribe((response)=>{
      this.vehicles=response
      console.log(this.vehicles)
    })
  }

}
