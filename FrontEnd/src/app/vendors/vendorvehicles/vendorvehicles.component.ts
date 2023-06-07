import { Component, OnInit } from '@angular/core';
import { Vehicle } from '../vehicle';
import { Vendor } from '../vendor';
import { VendorService } from '../vendor.service';

@Component({
  selector: 'app-vendorvehicles',
  templateUrl: './vendorvehicles.component.html',
  styleUrls: ['./vendorvehicles.component.css']
})
export class VendorvehiclesComponent implements OnInit{
  vendors:Vendor[] |any;
  vehicles:Vehicle[]|any;
  vehicle:Vehicle={
    id: 0,
    vendorId: 0,
    vehicleNumber: ''
  };
  selectedVendor:any;
  vendor:Vendor |any;
  insertStatus:boolean=false;
  updateStatus:boolean=false;
  deleteStatus:boolean=false;
  
  constructor(private svc:VendorService){}
    ngOnInit(): void {
     this.svc.getVendors().subscribe((response)=>{
      this.vendors=response
      console.log(this.vendors)
     })
    }
    onselect(vendor:any){
      this.selectedVendor=vendor
      this.svc.getVendorVehicles(vendor.id).subscribe((response)=>{
        this.vehicles=response
        console.log(this.vehicles)
      })
      }
      onInsertClick(){
        this.insertStatus=true;
      }
      onUpdateClick(vendor: any) {
        this.selectedVendor = vendor;
      
        this.updateStatus = true;
      }
      
onDeleteClick(vendor: any) {
  this.selectedVendor = vendor;
  this.deleteStatus = true;
}

      addVehicle(vendor:any){
        this.svc.addVehicle(vendor.id,this.vehicle).subscribe((response)=>{
          console.log(response)
    })
  }
  onUpdateDone(vendor:any){
    this.svc.updateVendor(vendor.id,this.vendor).subscribe((response)=>{
      console.log(response)
    })
  }
  onDeleteDone(vendor:any){
    this.svc.DeleteVendor(vendor.id).subscribe((response)=>{
      console.log(response);
    })
  }
  }
  
   


