import { Component, Input } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { Farmer } from 'src/app/demo/farmers/farmer';
import { FarmerService } from 'src/app/demo/farmers/farmer.service';
import { EmployeeService } from '../../employee.service';

@Component({
  selector: 'emp-farmerdetails',
  templateUrl: './farmerdetails.component.html',
  styleUrls: ['./farmerdetails.component.scss']
})
export class FarmerdetailsComponent {

  @Input() farmer:Farmer;
  farmerId: any;
  updateStatus:boolean = false;
  deleteStatus:boolean=false;

constructor(private farmersvc:FarmerService,private empsvc:EmployeeService ){
}

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
}
onDeleteClick(){
  this.updateStatus=false;
  this.deleteStatus=true;
}
onCancelClick(){
  this.deleteStatus=false;
}
}

