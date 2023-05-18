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
  updatestatus:boolean = false;
  deletestatus:boolean=false;

constructor(private route:ActivatedRoute,private farmersvc:FarmerService,private empsvc:EmployeeService ){
}

ngOnInit(): void {
  this.route.paramMap.subscribe((params) => {
    console.log(params)
    this.farmerId = params.get('id');
  });
}
  confirm() {
    this.farmersvc.deleteFarmer(this.farmer.farmerId).subscribe((response)=>{
      console.log(response)
      this.empsvc.sendRole({selectedRole:"Farmer"});    
  })
}
}

