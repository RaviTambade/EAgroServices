import { Component, OnInit } from '@angular/core';
import { Farmer } from '../farmer';
import { FarmerService } from '../farmer.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  farmer:Farmer|any={
    firstName:'',
    lastName:'',
    location:''
  };
  farmerId:number;
  constructor(private svc:FarmerService){}
  ngOnInit(): void {
    this.svc.getFarmerDetails(2).subscribe((response) => {
      this.farmer = response;
      console.log(this.farmer);
    })  }
  editProfile(){
    this.svc.updateFarmerDetails(2,this.farmer).subscribe((response)=>{
      console.log(response)
    })
  }
  

  }


