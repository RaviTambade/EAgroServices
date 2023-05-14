import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Merchant } from '../../pages/authentication/merchant';
import { MerchantService } from '../merchant.service';
import { Sellviewmodel } from '../sellviewmodel';

@Component({
  selector: 'app-merchant-purchaselist',
  templateUrl: './merchant-purchaselist.component.html',
  styleUrls: ['./merchant-purchaselist.component.scss']
})
export class MerchantPurchaselistComponent {
  merchant: Merchant | undefined;
  merchantId: string;
  sellViewModel: Sellviewmodel[];
  constructor(private svc: MerchantService, private route: ActivatedRoute) { }
  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      console.log(params)
      this.merchantId = params.get('id');
    });

    this.svc.getMerchantHistory(this.merchantId).subscribe((response) => {
      this.sellViewModel = response;
      console.log(this.sellViewModel);
    })
  }
      // onClick(){
      //   this.svc.getFarmerPurchaseDetails(this.farmerId).subscribe((response) => {
      //     this.purchaseViewModel = response;
      //     console.log(this.purchaseViewModel);
      //   })
      // }
}
