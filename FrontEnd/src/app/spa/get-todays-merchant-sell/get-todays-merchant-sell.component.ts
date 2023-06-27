import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { MerchantPurchase } from 'src/app/vendors/merchantPurchase';
import { CollectionService } from '../collection.service';

@Component({
  selector: 'app-get-todays-merchant-sell',
  templateUrl: './get-todays-merchant-sell.component.html',
  styleUrls: ['./get-todays-merchant-sell.component.css']
})
export class GetTodaysMerchantSellComponent implements OnInit {
merchantPurchases:MerchantPurchase[] |any;
merchantId:number |any;
constructor(private svc:CollectionService,private route:ActivatedRoute,private router :Router){}
ngOnInit(): void {
  this.merchantId=this.route.snapshot.paramMap.get('id')
this.svc.getTodaysMerchantPurchases(this.merchantId).subscribe((response)=>{
  this.merchantPurchases=response
  console.log(response)
})
}
onClick(){
  this.router.navigate(['/merchant',this.merchantId,'details'])
  }
  purchaseHistory(){
  this.router.navigate(['/merchant',this.merchantId,'merchantpurchases'])

  }
}

