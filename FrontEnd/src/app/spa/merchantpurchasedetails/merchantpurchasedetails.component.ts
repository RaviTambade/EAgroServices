import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MerchantPurchase } from 'src/app/vendors/merchantPurchase';
import { CollectionService } from '../collection.service';

@Component({
  selector: 'app-merchantpurchasedetails',
  templateUrl: './merchantpurchasedetails.component.html',
  styleUrls: ['./merchantpurchasedetails.component.css']
})
export class MerchantpurchasedetailsComponent implements OnInit {
  merchantPurchases:MerchantPurchase[] |any;
  merchantId:number |any;
  constructor(private svc:CollectionService,private route:ActivatedRoute){}
  ngOnInit(): void {
    this.merchantId=this.route.snapshot.paramMap.get('id')
  this.svc.getMerchantPurchases(this.merchantId).subscribe((response)=>{
    this.merchantPurchases=response
    console.log(response)
  })
  }
}
