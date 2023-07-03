import { Component } from '@angular/core';
import { AccountManagerService } from '../account-manager.service';
import { Account } from 'src/app/Account';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent {

  account:Account={
    peopleId: 1,
    acctNumber: '',
    acctType: '',
    ifscCode: '',
    balance: 0,
    registeredDate: new Date()
  }
  constructor(private svc:AccountManagerService){}

  addAccount(form:any){
    console.log(form);
    
    this.svc.addAccount(form).subscribe((res)=>{
      this.account=res;
      console.log(this.account);
    })
  }

}
