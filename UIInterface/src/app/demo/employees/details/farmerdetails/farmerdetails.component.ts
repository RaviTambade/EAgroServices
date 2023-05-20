import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FarmerService } from 'src/app/Services/farmer.service';
import { EmployeeService } from '../../../../Services/employee.service';
import { Farmer } from 'src/app/Models/farmer';


@Component({
  selector: 'emp-farmerdetails',
  templateUrl: './farmerdetails.component.html',
  styleUrls: ['./farmerdetails.component.scss']
})
export class FarmerdetailsComponent {

  @Input() farmer:Farmer;
  farmerId: any;

  sellListStatus: boolean=false;
  updateStatus:boolean = false;
  deleteStatus:boolean=false;
constructor(private farmersvc:FarmerService,private route:ActivatedRoute,private router:Router,private empsvc:EmployeeService){}

ngOnInit(): void {
}
  confirm() {
    this.farmersvc.deleteFarmer(this.farmer.farmerId).subscribe((response)=>{
      console.log(response)
      this.empsvc.sendRole({selectedRole:"Farmer"});    
  });
}

onUpdateClick(){
    this.updateStatus=true;
    this.deleteStatus=false;
    this.sellListStatus=false
}
onDeleteClick(){
  this.updateStatus=false;
  this.deleteStatus=true;
  this.sellListStatus=false
}
onCancelClick(){
  this.deleteStatus=false;
}
onSellListClick(){
  this.sellListStatus=true;
  this.updateStatus=false;
  this.deleteStatus=false;
}
}

