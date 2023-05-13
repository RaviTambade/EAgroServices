import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-merchant-nav-left',
  templateUrl: './merchant-nav-left.component.html',
  styleUrls: ['./merchant-nav-left.component.scss']
})
export class MerchantNavLeftComponent {
  merchantId:any;
  constructor( private route: ActivatedRoute) { }
  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      console.log(params)
      this.merchantId = params.get('id');
    });
  }
}
