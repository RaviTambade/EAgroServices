import { Component, OnInit } from '@angular/core';
import { FarmerService } from '../farmer.service';
import { VerifiedCollection } from 'src/app/collectioncenter/verified-collection';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-verifiedcollection',
  templateUrl: './verifiedcollection.component.html',
  styleUrls: ['./verifiedcollection.component.css']
})
export class VerifiedcollectionComponent implements OnInit{
  collectionId:undefined|any;
  veryfiedCollection:VerifiedCollection | any;
  constructor(private svc:FarmerService,private route:ActivatedRoute){}
  ngOnInit(): void { 
     this.route.paramMap.subscribe((params)=>{
      this.collectionId=params.get('id');
      console.log(this.collectionId);
     })
    this.svc.getVerifiedCollection(this.collectionId).subscribe((response)=>{
this.veryfiedCollection=response;
console.log(response);
    })
  }

}
