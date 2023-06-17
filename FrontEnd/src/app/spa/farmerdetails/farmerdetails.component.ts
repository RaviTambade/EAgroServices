import { Component, OnInit } from '@angular/core';
import { Farmer } from 'src/app/vendors/farmer';
import { CollectionService } from '../collection.service';
import { ActivatedRoute } from '@angular/router';
import { AddressService } from '../address.service';
import { Address } from 'src/app/vendors/address';

@Component({
  selector: 'app-farmerdetails',
  templateUrl: './farmerdetails.component.html',
  styleUrls: ['./farmerdetails.component.css']
})
export class FarmerdetailsComponent implements OnInit {
  farmer: Farmer | any;
  address: Address | any;
  farmerId: any;
  userId: any;
  constructor(private svc: CollectionService, private route: ActivatedRoute, private ser: AddressService) { }
  ngOnInit(): void {
    this.farmerId = this.route.snapshot.paramMap.get('id')
    this.svc.getfarmer(this.farmerId).subscribe((response) => {
      this.farmer = response;
      console.log(response);
    })
  }
  UserAddress() {
    this.userId = this.route.snapshot.paramMap.get('id')
    this.ser.getUserAddress(this.userId).subscribe((response) => {
      this.address = response;
      console.log(response);
    })


  }
}