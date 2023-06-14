import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { concat } from 'rxjs';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';
import { Collection } from 'src/app/vendors/collection';
import { Collectionviewmodel } from 'src/app/vendors/collectionviewmodel';
import { Crop } from 'src/app/vendors/crop';
import { Farmer } from 'src/app/vendors/farmer';
import { CollectionService } from '../collection.service';


@Component({
  selector: 'app-editcollection',
  templateUrl: './editcollection.component.html',
  styleUrls: ['./editcollection.component.css']
})
export class EditcollectionComponent {
  collectionViewModel:Collectionviewmodel | any;
  collectionId:number |any;
  collection:Collection |any;
  status:boolean |any;
  farmer:Farmer |any;
  crop:Crop |any;

  farmers:Farmer[]|any;
  crops:Crop []|any;
  
  constructor(private route: ActivatedRoute,public svc:CollectionService){}
  ngOnInit(): void {
    this.collectionId=this.route.snapshot.paramMap.get('id');
   }
edit(){
  console.log("edit called")
   this.farmer = this.getFarmerByName(this.collectionViewModel.farmerName);
  this.crop = this.getCropByName(this.collectionViewModel.cropName);

  if (this.farmer && this.crop) {
    this.collectionViewModel.collection.farmerId = this.farmer.id;
    this.collectionViewModel.collection.cropId = this.crop.id;
  }

  this.svc.editCollection(this.collectionId,this.collectionViewModel).subscribe((response)=>{
    this.status=response
    console.log(response)
  });
}
getFarmerByName(farmerName: string): Farmer | undefined {
  const farmer: Farmer | undefined = this.farmers.find((f: Farmer) =>(f.firstName + ' ' + f.lastName)=== farmerName);
  return farmer;
}

getCropByName(cropName: string): Crop | undefined {
  const crop: Crop | undefined = this.crops.find((c: Crop) => c.cropName == cropName);
  return crop;
}

receiveCollection($event: any) {
  this.collectionViewModel = $event.collectionViewModel;
  this.collectionViewModel.collection.farmerId = $event.farmerId;
  this.collectionViewModel.collection.cropId = $event.cropId;
}

}

