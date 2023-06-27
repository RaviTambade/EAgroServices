import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MerchantPurchase } from 'src/app/vendors/merchantPurchase';
import { CollectionService } from '../collection.service';

@Component({
  selector: 'app-merchantpurchases',
  templateUrl: './merchantpurchases.component.html',
  styleUrls: ['./merchantpurchases.component.css']
})
export class MerchantpurchasesComponent implements OnInit {
merchantPurchases:MerchantPurchase[] |any;
merchantPurchase:MerchantPurchase |any;
merchantId:number |any;
constructor(private svc:CollectionService,private route:ActivatedRoute,private router:Router){
  this.merchantPurchase={
    'sellId':0
  }
}
ngOnInit(): void {
  this.merchantId=this.route.snapshot.paramMap.get('id')
this.svc.getMerchantPurchases(this.merchantId).subscribe((response)=>{
  this.merchantPurchases=response
  console.log(response)
})
}
onClick(sellId:string){
localStorage.setItem('sellId',sellId);
this.router.navigate(['/merchant',this.merchantId,'details'])
}
}
