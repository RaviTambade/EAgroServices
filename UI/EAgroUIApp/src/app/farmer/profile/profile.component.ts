import { Component, OnInit } from '@angular/core';
import { FarmerService } from '../farmer.service';
import { ActivatedRoute } from '@angular/router';
import { Farmer } from '../farmer';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent  implements OnInit {
  farmerId=1;
  farmer: Farmer| any;
  constructor(private svc:FarmerService,private route:ActivatedRoute){}
  ngOnInit(): void {
//  this.route.paramMap.subscribe((params)=>{
//   this.farmerId=params.get('id');
//  })
this.svc.getFarmerDetails(this.farmerId).subscribe((response)=>{
  console.log(response);
  console.log(this.farmerId);
  this.farmer=response;
})

}

}