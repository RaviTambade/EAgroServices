import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Address } from 'src/app/vendors/address';
import { Collection } from 'src/app/vendors/collection';
import { Crop } from 'src/app/vendors/crop';
import { Farmer } from 'src/app/vendors/farmer';
import { AddressService } from '../address.service';
import { CollectionService } from '../collection.service';

@Component({
  selector: 'app-addnewcollection',
  templateUrl: './addnewcollection.component.html',
  styleUrls: ['./addnewcollection.component.css']
})
export class AddnewcollectionComponent implements OnInit {
  farmers: Farmer[] |any;
  states: string[] | any;
  districts: string[] | any;
  tahsils: string[] | any;
  villages: string[] | any;
  address: Address | any;
  crops: Crop[] | any;
  status: boolean | any;
  collection: Collection | any;

  constructor( private addSvc: AddressService,private collSvc: CollectionService,private router: Router) {
    this.address = {
      state: '',
      district: '',
      tahsil: '',
      village: '',
    };
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
    this.addSvc.getStates().subscribe((response) => {
      this.states = response;
    });

    this.collSvc.getCrops().subscribe((response) => {
      this.crops = response;
    });
  }

  onStateSelected(): void {
    this.addSvc.getDistricts(this.address.state).subscribe((response) => {
      this.districts = response;
      this.address.district = '';
      this.tahsils = []; 
      this.villages = []; 

    });
  }
  onDistrictSelected(): void {
    this.addSvc.getTahsils(this.address.district).subscribe((response) => {
      this.tahsils = response;
    });
  }
  onTahsilSelected(): void {
    this.addSvc.getVillages(this.address.tahsil).subscribe((response) => {
      this.villages = response;
    });
  }
  loadFarmers(): void {
    this.addSvc.getSelectedFarmers(this.address).subscribe((response) => {
      this.farmers = response;
      console.log(this.address)
      console.log(response)
    });
  }
  addCollection(): void {
    this.collSvc.addCollection(this.collection).subscribe((response) => {
      this.status = response;
      console.log(response);
      if (response) {
        alert('Collection added successfully');
        this.router.navigate(['/collections']);
      } else {
        alert('Check the form again....');
      }
    });
  }
}
