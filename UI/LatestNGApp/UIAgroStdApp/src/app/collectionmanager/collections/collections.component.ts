import { Component, OnInit } from '@angular/core';
import { AllCollectionList } from 'src/app/Models/allcollectionlist';
import { CollectionmanagerService } from 'src/app/Services/collectionmanager.service';
import { FarmerService } from 'src/app/Services/farmer.service';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-collections',
  templateUrl: './collections.component.html',
  styleUrls: ['./collections.component.css']
})
export class CollectionsComponent implements OnInit {
  collectionList: AllCollectionList[] = [];
  constructor(private managersvc: CollectionmanagerService, private usersvc: UserService, private farmersvc: FarmerService) { }
  allType = true;
  verifiedType = false;
  unverifiedType = false;
  type: string = "all";
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
    this.managersvc.getCollectionCenterId().subscribe((collectionCenterId) => {
      localStorage.setItem("collectionCenterId",collectionCenterId.toString());
      console.log(collectionCenterId)
      this.managersvc.getCollectionList(this.type, collectionCenterId).subscribe((collectionList) => {
        console.log(collectionList);
        this.collectionList = collectionList;
        let distinctFarmerIds = this.collectionList.map(item => item.farmerId)
          .filter((number, index, array) => array.indexOf(number) === index);

        let farmerIdString = distinctFarmerIds.join(',');

        this.managersvc.getUser(farmerIdString).subscribe((names) => {
          let farmerName = names
          console.log(farmerName)
          this.collectionList.forEach(item => {
            let matchingItem = farmerName.find(element => element.id === item.farmerId);
            if (matchingItem != undefined)
              item.farmerName = matchingItem.fullName;
          });
        });

      })
    })
  }

  onClickDetails(collectionId: number) {
    this.farmersvc.setSelectedCollectionId(collectionId,this.type);
    console.log(collectionId);
  }
}