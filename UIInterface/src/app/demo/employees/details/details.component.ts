import { Component, OnInit } from '@angular/core';
import { Farmer } from '../../farmers/farmer';
import { Admin } from '../../pages/authentication/admin';
import { Employee } from '../../pages/authentication/employee';
import { Merchant } from '../../pages/authentication/merchant';
import { Transport } from '../../transport/transport';
import { EmployeeService } from '../employee.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit{
  farmers:  any [];
  merchant : Merchant |any;
  employee:Employee |any;
  transport:Transport|any;
  admin:Admin |any;
  subscription: Subscription|undefined;
  
  data:any[];
  role: string;
  constructor(private svc:EmployeeService){}
  ngOnInit(): void {
    this.subscription = this.svc.getData().subscribe((response)=>{
      this.role=response.role
      this.data=response.data
    
           console.log(this.role)
      console.log(response)
    })
    }

    ngOnDestroy() {
      if(this.subscription !=undefined)
      this.subscription.unsubscribe();
    }
  }


