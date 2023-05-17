import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FarmerService } from '../../farmers/farmer.service';
import { MerchantService } from '../../merchants/merchant.service';
import { Merchant } from '../../pages/authentication/merchant';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-merchant-details',
  templateUrl: './merchant-details.component.html',
  styleUrls: ['./merchant-details.component.scss']
})
export class MerchantDetailsComponent implements OnInit {
@Input()   merchant:Merchant |any;
  merchantId:string ;
  constructor(private route:ActivatedRoute,private svc:MerchantService){}

ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      console.log(params)
      this.merchantId = params.get('id');
  })
  this.svc.getMerchant(this.merchantId).subscribe((response)=>{
    this.merchant=response
  })
}
}
