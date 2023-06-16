import { Component, Input, OnInit } from '@angular/core';
import { CollectionService } from '../collection.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Collection } from 'src/app/vendors/collection';
import { Collectionviewmodel } from 'src/app/vendors/collectionviewmodel';
import { Farmer } from 'src/app/vendors/farmer';
import { Crop } from 'src/app/vendors/crop';

@Component({
  selector: 'app-qualitycontrol',
  templateUrl: './qualitycontrol.component.html',
  styleUrls: ['./qualitycontrol.component.css']
})
export class QualitycontrolComponent implements OnInit {
  collectionId: number | any;
  collection: Collection |any;
  farmers:Farmer |any;
  crops :Crop |any;
    constructor(private svc: CollectionService, private route: ActivatedRoute,private router:Router) {}
  ngOnInit(): void {
    this.collectionId=this.route.snapshot.paramMap.get('id')
    
  }
  updateCollection(): void {
    console.log("🚀 ", this.collection);
    this.svc.editCollection(this.collectionId, this.collection).subscribe((response) => {
      console.log(response);
      if(response){
        alert("Quality assured successfully")
        this.router.navigate(['/collections']);
       }
       else{
        alert("Check the form again ....")
       }
      })
    }
  receiveCollection(event:any){
    this.collection=event.collection;
    console.log("🚀 ~ receiveCollection ~ this.collection:", this.collection);
  }
 

}

