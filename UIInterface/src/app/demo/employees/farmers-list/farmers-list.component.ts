import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Farmer } from '../../farmers/farmer';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-farmers-list',
  templateUrl: './farmers-list.component.html',
  styleUrls: ['./farmers-list.component.scss']
})
export class FarmersListComponent implements OnInit{
  farmers:Farmer[] |any;
  constructor(private svc:EmployeeService,private router:Router){}
  ngOnInit(): void {
   this.svc.getAllFarmers().subscribe((response)=>{
    this.farmers=response;
   console.log(response);
   })
  }
  onSelect(farmer:any){
    if(farmer!=undefined)
    this.router.navigate(['employees/farmerdetails',farmer.farmerId]); 
   }
   
}
