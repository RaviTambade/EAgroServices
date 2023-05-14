import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Merchant } from '../../pages/authentication/merchant';
import { MerchantService } from '../merchant.service';
@Component({
  selector: 'app-merchant-update',
  templateUrl: './merchant-update.component.html',
  styleUrls: ['./merchant-update.component.scss']
})
export class MerchantUpdateComponent {
  merchant: Merchant | any = {
    firstName: '',
    lastName: '',
    companyName:'',
    location: ''
  };
  merchantId: any;
  constructor(private svc: MerchantService, private route: ActivatedRoute,private router:Router) { }
  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      console.log(params)
      this.merchantId = params.get('id');
    });
    this.svc.getMerchant(this.merchantId).subscribe((response) => {
      this.merchant = response;
      console.log(this.merchant);
    });
  }
    editProfile() {
      this.svc.updateMerchant(this.merchantId, this.merchant).subscribe((response) => {
        console.log(response)
      alert("Update Successfully")
      this.router.navigate(["merchants/profile",this.merchantId]);
      })
}
}
