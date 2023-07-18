import { Component, OnInit } from '@angular/core';
import { FarmerService } from '../farmer.service';
import { ActivatedRoute } from '@angular/router';
import { Goodscollection } from '../goodscollection';

@Component({
  selector: 'app-goodscollection',
  templateUrl: './goodscollection.component.html',
  styleUrls: ['./goodscollection.component.css']
})
export class GoodscollectionComponent implements OnInit {
  farmerId=2;
  farmerCollections:Goodscollection[] | undefined;
  constructor(private svc:FarmerService,private route:ActivatedRoute){}
ngOnInit(): void {
  //  this.route.paramMap.subscribe((params)=>{
  //   this.farmerId=params.get('id');
  //  })
  this.svc.getFarmerCollection(this.farmerId).subscribe((response)=>{
    console.log(this.farmerId);
this.farmerCollections=response;
console.log(response);
  })
}
constructer() {}
}
