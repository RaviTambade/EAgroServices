import { Component, OnInit } from '@angular/core';
import { VendorService } from '../vendor.service';
import { Vendor } from 'src/app/vendors/vendor';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-vendorsdetails',
  templateUrl: './vendorsdetails.component.html',
  styleUrls: ['./vendorsdetails.component.css']
})
export class VendorsdetailsComponent implements OnInit{
  vendor: Vendor|any;
  transportId:any;
  constructor(private svc:VendorService,private route:ActivatedRoute){}

  ngOnInit(): void {
this.transportId=this.route.snapshot.paramMap.get('id')
    this.svc.getVendor(this.transportId).subscribe((response)=>{
      this.vendor=response;
      console.log(response);
  })

}
}