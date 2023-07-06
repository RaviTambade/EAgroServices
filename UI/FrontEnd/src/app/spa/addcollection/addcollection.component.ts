  import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Collection } from 'src/app/vendors/collection';
import { Crop } from 'src/app/vendors/crop';
import { Farmer } from 'src/app/vendors/farmer';
import { CollectionService } from '../collection.service';

@Component({
  selector: 'app-addcollection',
  templateUrl: './addcollection.component.html',
  styleUrls: ['./addcollection.component.css']
})
export class AddcollectionComponent implements OnInit {
  collection: Collection | any;
  status: boolean | any;
  farmers: Farmer[] | any;
  crops: Crop[] | any;

  constructor(private svc: CollectionService,private router:Router) {
    this.collection = {
      farmerId: 0,
      cropId: 0,
      containerType: '',
      quantity: 0,
      totalWeight: 0,
      tareWeight: 0
    };
  }

  ngOnInit(): void {
    this.svc.getfarmers().subscribe((response) => {
      this.farmers = response;
      console.log(response);
    });

    this.svc.getCrops().subscribe((response) => {
      this.crops = response;
      console.log(response);
    });
  }

  addCollection(): void {
    this.svc.addCollection(this.collection).subscribe((response) => {
      this.status = response;
      console.log(response);
      if(response){
        alert("Collection added successfully")
        this.router.navigate(['/collections']);
       }
       else{
        alert("Check the form again ....")
       }
      })
    }
    }
