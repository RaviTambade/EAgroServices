import { Component, EventEmitter, Output } from '@angular/core';
import { Farmer } from '../../farmer';
import { FarmerService } from '../../farmer.service';

@Component({
  selector: 'app-farmer-dashbord',
  templateUrl: './farmer-dashbord.component.html',
  styleUrls: ['./farmer-dashbord.component.css']
})
export class FarmerDashbordComponent {

  accountId:number|undefined
  farmer:Farmer|undefined
 
  
  @Output() sendfarmer =new EventEmitter();
farmerId: any;
  constructor(private svc: FarmerService) { }
 
   getDetails(id:any){
     this.svc.GetDetails(id).subscribe((response) => {
       this.farmer = response;
       //this.sendAccount.emit({account:this.account});
       console.log(this.farmer);
     })
 
   }
 }


