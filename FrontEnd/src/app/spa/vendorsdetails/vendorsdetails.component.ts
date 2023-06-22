import { Component, OnInit } from '@angular/core';
import { VendorService } from '../vendor.service';
import { Vendor } from 'src/app/vendors/vendor';
import { ActivatedRoute } from '@angular/router';
import { AddressService } from '../address.service';
import { Address } from 'src/app/vendors/address';

@Component({
  selector: 'app-vendorsdetails',
  templateUrl: './vendorsdetails.component.html',
  styleUrls: ['./vendorsdetails.component.css']
})
export class VendorsdetailsComponent implements OnInit{
  vendor: Vendor|any;
  transportId:any;
  address:Address|any;
  vendorId: any;
  constructor(private svc:VendorService,private route:ActivatedRoute,private ser:AddressService){}

  ngOnInit(): void {
this.transportId=this.route.snapshot.paramMap.get('id')
    this.svc.getVendor(this.transportId).subscribe((response)=>{
      this.vendor=response;
      console.log(response);
  })

}
UserAddress() {
this.vendorId=this.route.snapshot.paramMap.get('id')
  this.ser.getUserAddress(this.vendorId).subscribe((response) => {
    this.address = response;
    console.log(response);
  })


}
}