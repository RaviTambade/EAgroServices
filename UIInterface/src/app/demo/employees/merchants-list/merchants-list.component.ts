import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Merchant } from '../../pages/authentication/merchant';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-merchants-list',
  templateUrl: './merchants-list.component.html',
  styleUrls: ['./merchants-list.component.scss']
})
export class MerchantsListComponent implements OnInit {
merchants:Merchant[] |any;
  constructor(private svc:EmployeeService,private router :Router){}
  ngOnInit(): void {
    this.svc.getAllMerchants().subscribe((response)=>{
      this.merchants=response
    })
}
onSelect(merchant:any){
  if(merchant!=undefined)
  this.router.navigate(['employees/merchantdetails',merchant.merchantId]); 
 }
}
