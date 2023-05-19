import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MerchantService } from 'src/app/demo/merchants/merchant.service';
import { EmployeeService } from '../../../employee.service';
import { Merchant } from 'src/app/demo/pages/authentication/merchant';

@Component({
  selector: 'emp-merchant-update',
  templateUrl: './merchant-update.component.html',
  styleUrls: ['./merchant-update.component.scss']
})
export class MerchantUpdateComponent {
  @Input() merchant:Merchant;
  merchantId: number;

constructor(private svc:MerchantService,private empsvc:EmployeeService){
}

ngOnInit(): void {
}

  editProfile() {
    this.svc.updateMerchant(this.merchant.merchantId, this.merchant).subscribe((response) => {
      console.log(response)
    alert("Update Successfully")
    this.empsvc.sendRole({selectedRole:"Merchant"});   

  });
}
}
