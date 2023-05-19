import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FarmerService } from 'src/app/demo/farmers/farmer.service';
import { EmployeeService } from '../../employee.service';
import { Farmer } from 'src/app/demo/farmers/farmer';


@Component({
  selector: 'emp-farmerdetails',
  templateUrl: './farmerdetails.component.html',
  styleUrls: ['./farmerdetails.component.scss']
})
export class FarmerdetailsComponent {

  @Input() farmer:Farmer;
  farmerId: any;

  update:boolean = false;
constructor(private farmersvc:FarmerService,private route:ActivatedRoute,private router:Router,private empsvc:EmployeeService){}


  updateStatus:boolean = false;
  deleteStatus:boolean=false;



ngOnInit(): void {
}
  confirm() {
    this.farmersvc.deleteFarmer(this.farmer.farmerId).subscribe((response)=>{
      console.log(response)
      this.empsvc.sendRole({selectedRole:"Farmer"});    
  });
}


  editProfile() {
    this.farmersvc.updateFarmerDetails(this.farmerId, this.farmer).subscribe((response) => {
      console.log(response)
    alert("Update Successfully")
    this.empsvc.sendRole({selectedRole:"Farmer"})
    // window.location.reload();
  
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

