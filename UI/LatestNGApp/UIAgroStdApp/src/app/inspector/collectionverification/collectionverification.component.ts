import { Component, OnInit } from '@angular/core';
import { AllCollectionList } from 'src/app/Models/allcollectionlist';
import { CollectionmanagerService } from 'src/app/Services/collectionmanager.service';
import { FarmerService } from 'src/app/Services/farmer.service';
import { InspectorService } from 'src/app/Services/inspector.service';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-collectionverification',
  templateUrl: './collectionverification.component.html',
  styleUrls: ['./collectionverification.component.css']
})
export class CollectionverificationComponent implements OnInit {
  collectionList: AllCollectionList[] = [];
  constructor(private managersvc: CollectionmanagerService, private usersvc: UserService, private farmersvc: FarmerService,private inspectorsvc:InspectorService) { }
  allType = false;
  verifiedType = false;
  unverifiedType = true;
  type: string = "unverified";
  ngOnInit(): void {
    this.fetchData()
  }
  setType(selectedType: string) {
    this.type = selectedType;
    this.fetchData()
    switch (selectedType) {
      case 'all':
        this.verifiedType = false;
        this.unverifiedType = false;
        break;
      case 'verified':
        this.allType = false;
        this.unverifiedType = false;
        break;
      case 'unverified':
        this.allType = false;
        this.verifiedType = false;
        break;
    }
  }
  fetchData() {
    this.inspectorsvc.getcollectionCenterId().subscribe((res) => {
      this.managersvc.getCollectionList(this.type,res.collectionCenterId).subscribe((collectionList) => {
        console.log(collectionList);
        this.collectionList = collectionList;
        this.onClickDetails(this.collectionList[0].collectionId,this.type)
        let distinctFarmerIds = this.collectionList.map(item => item.farmerId)
          .filter((number, index, array) => array.indexOf(number) === index);

        let farmerIdString = distinctFarmerIds.join(',');
        console.log(farmerIdString);

        this.managersvc.getUser(farmerIdString).subscribe((names) => {
          let farmerName = names
          console.log(farmerIdString);
          this.collectionList.forEach(item => {
            let matchingItem = farmerName.find(element => element.id === item.farmerId);
            if (matchingItem != undefined)
              item.farmerName = matchingItem.fullName;
          });
        });

      })
    })
  }

  onClickDetails(collectionId: number,type:string) {
    this.farmersvc.setSelectedCollectionId(collectionId,type);
    console.log(collectionId,type);
  }
  onClickVerify(collectionId:number){
    this.inspectorsvc.setVerifiedCollectionId(collectionId);
    console.log(collectionId);
  }
  
}
