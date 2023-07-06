import { Component } from '@angular/core';
import { AccountManagerService } from '../account-manager.service';
import { Account } from 'src/app/Account';

@Component({
  selector: 'app-update-account',
  templateUrl: './update-account.component.html',
  styleUrls: ['./update-account.component.css']
})
export class UpdateAccountComponent {
    constructor(private svc :AccountManagerService){}
    account:Account={
      peopleId: 1,
      acctNumber: '',
      acctType: '',
      ifscCode: '',
      balance: 0,
      registeredDate: new Date()
    }

    public updateAccount(form:any){
      this.svc.UpdateAccount(this.account).subscribe((res)=>{
        this.account =res;
      })
    }
}
