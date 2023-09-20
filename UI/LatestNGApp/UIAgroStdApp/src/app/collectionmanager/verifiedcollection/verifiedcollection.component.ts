import { Component, OnInit } from '@angular/core';
import { VerifiedCollection } from 'src/app/Models/verifiedCollection';
import { CollectionmanagerService } from 'src/app/Services/collectionmanager.service';
import { FarmerService } from 'src/app/Services/farmer.service';

@Component({
  selector: 'app-verifiedcollection',
  templateUrl: './verifiedcollection.component.html',
  styleUrls: ['./verifiedcollection.component.css']
})
export class VerifiedcollectionComponent implements OnInit{
  verifiedCollection:VerifiedCollection[]=[];
  constructor(private colmsvc:CollectionmanagerService){}
  ngOnInit(): void {
    this.colmsvc.getCollectionCenterId().subscribe((collectionCenterId)=>{
   this.colmsvc.getVerifiedCollection(collectionCenterId).subscribe((response)=>{
    this.verifiedCollection=response;
   })
  })
  }
  onClickDetails(collectionId: number) {
    this.colmsvc.setSelectedCollectionId(collectionId);
    console.log(collectionId);
  }
}
