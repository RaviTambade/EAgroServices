import { Component, Input, OnInit } from '@angular/core';
import { CollectionService } from '../collection.service';
import { ActivatedRoute } from '@angular/router';
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
    constructor(private svc: CollectionService, private route: ActivatedRoute) {
      this.collection={
        containerType: '',
        quantity: 0,
        grade: '',
        totalWeight: 0,
        tareWeight: 0,
        ratePerKg: 0
      }
    }
  ngOnInit(): void {
    this.collectionId=this.route.snapshot.paramMap.get('id')
    
  }
  updateCollection(): void {
    this.svc.editCollection(this.collectionId, this.collection).subscribe((response) => {
      console.log(response);
    });
  }
 

}

