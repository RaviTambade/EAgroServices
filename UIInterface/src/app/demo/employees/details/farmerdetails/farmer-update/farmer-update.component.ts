import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FarmerService } from 'src/app/demo/farmers/farmer.service';
import { EmployeeService } from '../../../employee.service';

@Component({
  selector: 'emp-farmer-update',
  templateUrl: './farmer-update.component.html',
  styleUrls: ['./farmer-update.component.scss']
})
export class FarmerUpdateComponent {

  @Input() farmer:any;
  farmerId: any;
  update:boolean = false;

constructor(private svc:FarmerService,private route:ActivatedRoute,private empsvc:EmployeeService){
}

ngOnInit(): void {
  this.route.paramMap.subscribe((params) => {
    console.log(params)
    this.farmerId = params.get('id');
  });
}

  editProfile() {
    this.svc.updateFarmerDetails(this.farmerId, this.farmer).subscribe((response) => {
      console.log(response)
    this.empsvc.sendRole({selectedRole:"Farmer"});   
});
}
}