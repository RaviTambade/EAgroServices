import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MerchantService } from '../../../Services/merchant.service';
import { EmployeeService } from '../../../Services/employee.service';
import { Merchant } from 'src/app/Models/merchant';
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
  @Input() merchantId:string|number;
  @Input() callFromParent:boolean=false;
  constructor(private svc: MerchantService, private route: ActivatedRoute,private router:Router,
    private empsvc:EmployeeService) { }
  ngOnInit(): void {
    console.log("component called")
    if(this.merchantId==undefined){
    this.route.paramMap.subscribe((params) => {
      console.log(params)
      this.merchantId = params.get('id');
    });
  }
    this.svc.getMerchant(this.merchantId).subscribe((response) => {
      this.merchant = response;
      console.log(this.merchant);
    });
  }
    editProfile() {
      this.svc.updateMerchant(this.merchantId, this.merchant).subscribe((response) => {
        console.log(response)
      if(this.callFromParent==false){
      this.router.navigate(["merchants/profile",this.merchantId]);
      }
      else{
       this.empsvc.sendRole({selectedRole:"Merchant"})  ;
      }
      })
}
}
