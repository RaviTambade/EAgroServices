import { Component, Input } from '@angular/core';
import { MerchantService } from 'src/app/demo/merchants/merchant.service';
import { Merchant } from 'src/app/demo/pages/authentication/merchant';
import { EmployeeService } from '../../employee.service';

@Component({
  selector: 'emp-merchant-details',
  templateUrl: './merchant-details.component.html',
  styleUrls: ['./merchant-details.component.scss']
})
export class MerchantDetailsComponent {
  @Input() merchant:Merchant;
  merchantId: any;
  updateStatus:boolean = false;
  deleteStatus:boolean=false;

constructor(private merchantsvc:MerchantService,private empsvc:EmployeeService ){
}

ngOnInit(): void {
  
  };

  confirm() {
    this.merchantsvc.deleteMerchant(this.merchant.merchantId).subscribe((response)=>{
      console.log(response)
      this.empsvc.sendRole({selectedRole:"Merchant"});    
  })
}
onUpdateClick(){
  this.updateStatus=true;
  this.deleteStatus=false;
}
onDeleteClick(){
this.updateStatus=false;
this.deleteStatus=true;
}
onCancelClick(){
  this.deleteStatus=false;
}
}
