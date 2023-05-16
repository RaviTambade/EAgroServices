import { Component, OnInit } from '@angular/core';
import { Farmer } from '../../farmers/farmer';
import { Admin } from '../../pages/authentication/admin';
import { Employee } from '../../pages/authentication/employee';
import { Merchant } from '../../pages/authentication/merchant';
import { Transport } from '../../transport/transport';
import { EmployeeService } from '../employee.service';

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
  
  data:any[];
  constructor(private svc:EmployeeService){}
  ngOnInit(): void {
    this.svc.getData().subscribe((response)=>{
      // this.data=response
      this.farmers=response
      console.log(response)
    })
    }
  }


