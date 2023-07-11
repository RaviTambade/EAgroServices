import { Component } from '@angular/core';
import { AccountManagerService } from '../account-manager.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent {

  constructor(private svc:AccountManagerService){}
  acctno:any;
  onClick(acctno:any){
console.log(acctno);
    this.svc.getDetails(acctno).subscribe((res)=>{
      console.log(res);
    })
  }
}
