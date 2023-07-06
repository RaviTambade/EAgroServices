import { Component, OnInit } from '@angular/core';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';
import { Farmer } from '../farmer';
import { Vendor } from '../vendor';
import { VendorService } from '../vendor.service';

@Component({
  selector: 'app-listdetails',
  templateUrl: './listdetails.component.html',
  styleUrls: ['./listdetails.component.css']
})
export class ListdetailsComponent implements OnInit{
farmers:Farmer[] ;
farmerId:number |any;
farmer:Farmer;
selectedFarmer:any;
constructor(private svc:VendorService){
  this.farmers=[]
  this.farmer={
    id:0,
    firstName:'',
    lastName:'',
    contactNumber:'',
    aadharId:'',
    imageUrl:''
  }
}
  ngOnInit(): void {
  this.svc.GetFarmers().subscribe((farmers:Farmer[])=>{
    this.farmers=farmers
  })
  }
  onClick(farmerId:any){
    this.svc.GetFarmer(farmerId).subscribe((response)=>{
      this.selectedFarmer=response
      console.log(response)
    })
  }

}
