import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Merchant } from '../../pages/authentication/merchant';
import { MerchantService } from '../merchant.service';

@Component({
  selector: 'app-merchant-profile',
  templateUrl: './merchant-profile.component.html',
  styleUrls: ['./merchant-profile.component.scss']
})
export class MerchantProfileComponent {
  merchant: Merchant | any = {
    firstName: '',
    lastName: '',
    companyName:'',
    location: ''
  };
  status: boolean = false;
  merchantId: string;

  constructor(private svc: MerchantService, private route: ActivatedRoute,private router:Router) { }
  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      console.log(params)
      this.merchantId = params.get('id');
    });
    this.svc.getMerchant(this.merchantId).subscribe((response) => {
      this.merchant = response;
      console.log(this.merchant);
    })
  }
  onClick() {
    this.status = true;
    this.router.navigate(["merchants/update",this.merchantId]);
  }
  
}
