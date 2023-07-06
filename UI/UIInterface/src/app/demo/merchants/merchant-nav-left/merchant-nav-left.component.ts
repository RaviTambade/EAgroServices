import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MerchantService } from 'src/app/Services/merchant.service';

@Component({
  selector: 'app-merchant-nav-left',
  templateUrl: './merchant-nav-left.component.html',
  styleUrls: ['./merchant-nav-left.component.scss']
})
export class MerchantNavLeftComponent {
  merchantId:any;
  merchant:any;
  constructor( private route: ActivatedRoute,private svc:MerchantService) {}
  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      console.log(params)
      this.merchantId = params.get('id');
    });
    this.svc.getMerchant(this.merchantId).subscribe((response)=>{
       this.merchant=response
    })
    
  }
}
