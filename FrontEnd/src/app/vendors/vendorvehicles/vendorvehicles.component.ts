import { Component, OnInit } from '@angular/core';
import { Vehicle } from '../vehicle';
import { Vendor } from '../vendor';
import { VendorService } from '../vendor.service';

@Component({
  selector: 'app-vendorvehicles',
  templateUrl: './vendorvehicles.component.html',
  styleUrls: ['./vendorvehicles.component.css']
})
export class VendorvehiclesComponent implements OnInit{
vendors:Vendor[] |any;
vehicles:Vehicle[]|any;
selectedVendor:any;
vendor:Vendor |any;
constructor(private svc:VendorService){}
  ngOnInit(): void {
   this.svc.getVendors().subscribe((response)=>{
    this.vendors=response
    console.log(this.vendors)
   })
  }
  onselect(vendor:any){
    this.selectedVendor=vendor
    this.svc.getVendorVehicles(vendor.id).subscribe((response)=>{
      this.vehicles=response
      console.log(this.vehicles)
    })
   
    }
   }


