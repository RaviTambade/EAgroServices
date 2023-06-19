import { Component, OnInit } from '@angular/core';
import { MerchantService } from '../merchant.service';
import { ActivatedRoute } from '@angular/router';
import { Merchant } from 'src/app/vendors/merchant';
import { Address } from 'src/app/vendors/address';
import { AddressService } from '../address.service';

@Component({
  selector: 'app-merchantdetails',
  templateUrl: './merchantdetails.component.html',
  styleUrls: ['./merchantdetails.component.css']
})
export class MerchantdetailsComponent implements OnInit{
  merchantId: any;
  merchant: Merchant|undefined;
  userId:any;
  address: Address | undefined;
  constructor(private svc:MerchantService,private route:ActivatedRoute,private serv:AddressService){}
  ngOnInit(): void {
    this.merchantId=this.route.snapshot.paramMap.get('id')
  this.svc.getMerchant(this.merchantId).subscribe((response)=>{
    this.merchant=response;
    console.log(response)

  })
  }
  UserAddress() {
    this.userId = this.route.snapshot.paramMap.get('id')
    this.serv.getUserAddress(this.userId).subscribe((response) => {
      this.address = response;
      console.log(this.address);
      console.log(this.userId);
    })

}
}