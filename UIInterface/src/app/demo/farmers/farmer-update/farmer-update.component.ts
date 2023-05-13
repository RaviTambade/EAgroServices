import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Farmer } from '../farmer';
import { FarmerService } from '../farmer.service';

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
  farmerId: any;
  constructor(private svc: FarmerService, private route: ActivatedRoute,private router:Router) { }
  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      console.log(params)
      this.farmerId = params.get('id');
    });
    this.svc.getFarmer(this.farmerId).subscribe((response) => {
      this.farmer = response;
      console.log(this.farmer);
    });
  }
    editProfile() {
      this.svc.updateFarmerDetails(this.farmerId, this.farmer).subscribe((response) => {
        console.log(response)
      alert("Update Successfully")
      this.router.navigate(["farmers/profile",this.farmerId]);

      })
}
}

