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
  verifiedCollections:VerifiedCollection[]=[];
  farmerName: string='';
  constructor(private colmsvc:CollectionmanagerService){}
  ngOnInit(): void {
    this.colmsvc.getCollectionCenterId().subscribe((collectionCenterId)=>{
   this.colmsvc.getVerifiedCollection(collectionCenterId).subscribe((response)=>{
    this.verifiedCollections=response;

    let distinctFarmerIds = this.verifiedCollections.map(item => item.farmerId)
          .filter((number, index, array) => array.indexOf(number) === index);

        let farmerIdString = distinctFarmerIds.join(',');

        this.colmsvc.getUser(farmerIdString).subscribe((names) => {
          let farmerName = names
          this.verifiedCollections.forEach(item => {
            let matchingItem = farmerName.find(element => element.id === item.farmerId);
            if (matchingItem != undefined)
              item.farmerName = matchingItem.name;
          });
        });
   
    }) 
   })
  }
  onClickDetails(collectionId: number) {
    this.colmsvc.setSelectedCollectionId(collectionId);
    console.log(collectionId);
  }
  addToShipment(collectionId:number){
    this.colmsvc.setSelectedCollectionIdForShipment(collectionId);
    console.log(collectionId);
    
  }
  
}
