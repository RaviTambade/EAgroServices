import { Component, OnInit } from '@angular/core';
import { FarmerService } from '../farmer.service';
import { VerifiedCollection } from 'src/app/collectioncenter/verified-collection';
import { ActivatedRoute } from '@angular/router';
import { CorporateService } from 'src/app/corporate.service';

@Component({
  selector: 'app-verifiedcollection',
  templateUrl: './verifiedcollection.component.html',
  styleUrls: ['./verifiedcollection.component.css']
})
export class VerifiedcollectionComponent implements OnInit{
  farmerId=2;
  veryfiedCollections:VerifiedCollection[]=[];
   veryfiedFarmerCollection:VerifiedCollection={
     corporateId: 0,
     collectionCenterName: '',
     collectionId: 0,
     grade: '',
     weight: 0,
     inspectorId: 0,
     
   };
   
  constructor(private svc:FarmerService,private route:ActivatedRoute,private crpSvc:CorporateService){}
  ngOnInit(): void { 
    //  this.route.paramMap.subscribe((params)=>{
    //   this.farmerId=params.get('id');
    //   console.log(this.farmerId);
    //  })
    this.svc.getVerifiedCollection(this.farmerId).subscribe((response)=>{
this.veryfiedCollections=response;
console.log(response);
let distinctcollectioncenterIds = this.veryfiedCollections.map(item => item.corporateId)
.filter((number, index, array) => array.indexOf(number) === index);

let collectionCenterIdString = distinctcollectioncenterIds.join(',');

this.crpSvc.getCorporates(collectionCenterIdString).subscribe((names) => {
let corporationNames = names
this.veryfiedCollections.forEach(item => {
  let matchingItem = corporationNames.find(element => element.id === item.corporateId);
  if (matchingItem != undefined)
    item.collectionCenterName = matchingItem.name;
});
});
    })
  }

}
