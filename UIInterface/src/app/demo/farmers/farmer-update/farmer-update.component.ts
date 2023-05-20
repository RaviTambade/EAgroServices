import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Farmer } from '../farmer';
import { FarmerService } from '../farmer.service';
import { EmployeeService } from '../../employees/employee.service';

@Component({
  selector: 'app-farmer-update',
  templateUrl: './farmer-update.component.html',
  styleUrls: ['./farmer-update.component.scss']
})
export class FarmerUpdateComponent {
  farmer: Farmer | any = {
    firstName: '',
    lastName: '',
    location: ''
  };
   @Input()farmerId: any;
   @Input() callFromParent:boolean=false;
  constructor(private svc: FarmerService, private route: ActivatedRoute,private router:Router,
    private empsvc:EmployeeService) { }
  ngOnInit(): void {
    if(this.farmerId==undefined){
    this.route.paramMap.subscribe((params) => {
      console.log(params)
      this.farmerId = params.get('id');
    });
  }
    this.svc.getFarmer(this.farmerId).subscribe((response) => {
      this.farmer = response;
      console.log(this.farmer);
    });
  }
    editProfile() {
      this.svc.updateFarmerDetails(this.farmerId, this.farmer).subscribe((response) => {
        console.log(response)
      if(this.callFromParent==false){
      this.router.navigate(["farmers/profile",this.farmerId]);
      }
      else{
       this.empsvc.sendRole({selectedRole:"Farmer"})  ;
      }
      })
}
}

