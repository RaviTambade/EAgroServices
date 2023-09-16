import { Component, OnInit } from '@angular/core';
import { AllCollectionList } from 'src/app/Models/allcollectionlist';
import { CollectionmanagerService } from 'src/app/Services/collectionmanager.service';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-collections',
  templateUrl: './collections.component.html',
  styleUrls: ['./collections.component.css']
})
export class CollectionsComponent implements OnInit {
  collectionList:AllCollectionList[]=[] ;
constructor(private managersvc:CollectionmanagerService,private usersvc:UserService){}
allType = true;
verifiedType = false;
unverifiedType = false;
type:string="all";
farmerName:undefined;
  ngOnInit(): void {
    console.log(this.type)
    this.fetchData()
    // /   console.log(response);

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
    fetchData(){
    this.managersvc.getCollectionCenterId().subscribe((collectionCenterId)=>{
      this.managersvc.getCollectionList(this.type, collectionCenterId).subscribe((collectionList)=>{
       this.collectionList=collectionList;
      //  this.managersvc.getFarmer(collectionList.farmerId).subscribe((response)=>{
      //    this.farmerName=response.name;
      //    console.log(response);
      for (const collection of this.collectionList) {
        this.managersvc.getFarmer(collection.farmerId).subscribe((response) => {
          this.farmerName = response.name;
          console.log(response);

})
}
    })
  })
}

}