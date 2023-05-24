import { Component, Input } from '@angular/core';
import { MerchantService } from 'src/app/Services/merchant.service';
import { EmployeeService } from '../../../../Services/employee.service';
import { Merchant } from 'src/app/Models/merchant';

@Component({
  selector: 'emp-merchant-details',
  templateUrl: './merchant-details.component.html',
  styleUrls: ['./merchant-details.component.scss']
})
export class MerchantDetailsComponent {
  @Input() merchant: Merchant;
  merchantId: any;
  updateStatus: boolean = false;
  deleteStatus: boolean = false;
  purchaseListStatus: boolean = false;

  constructor(private merchantsvc: MerchantService, private empsvc: EmployeeService) {
  }

  ngOnInit(): void {

  };

  confirm() {
    this.merchantsvc.deleteMerchant(this.merchant.merchantId).subscribe((response) => {
      console.log(response)
      this.empsvc.sendRole({ selectedRole: "Merchant" });
    })
  }
  onUpdateClick() {
    this.updateStatus = true;
    this.deleteStatus = false;
    this.purchaseListStatus = false;

  }
  onDeleteClick() {
    this.updateStatus = false;
    this.deleteStatus = true;
    this.purchaseListStatus = false;

  }
  onCancelClick() {
    this.deleteStatus = false;
  }
  onCloseListClick(){
    this.purchaseListStatus=false;
  }
  onSellListClick() {
    this.purchaseListStatus = true;
    this.updateStatus = false;
    this.deleteStatus = false;
  }
}
