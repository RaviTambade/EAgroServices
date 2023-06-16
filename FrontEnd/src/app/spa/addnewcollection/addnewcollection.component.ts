import { Component, OnInit } from '@angular/core';
import { Address } from 'src/app/vendors/address';
import { Farmer } from 'src/app/vendors/farmer';
import { AddressService } from '../address.service';

@Component({
  selector: 'app-addnewcollection',
  templateUrl: './addnewcollection.component.html',
  styleUrls: ['./addnewcollection.component.css']
})
export class AddnewcollectionComponent implements OnInit {
  farmers:Farmer[];
  address:Address |any;
constructor(private svc:AddressService){
  this.address={
    state: '',
    district: '',
    tahsil: '',
    village: '',
  } 
  this.farmers=[]
}
  ngOnInit(): void {
    this.svc.getSelectedFarmers(this.address).subscribe((response)=>{
    this.farmers=response
    })
  }
}
