import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { VendorService } from '../vendor.service';


interface Vendor {
  id: number;
  companyName: string;
}

interface Vehicle {
  id: number;
  vendorId: number;
  vehicleNumber: string;
}
@Component({
  selector: 'app-vendorvehicles',
  templateUrl: './vendorvehicles.component.html',
  styleUrls: ['./vendorvehicles.component.css']
})
export class VendorvehiclesComponent implements OnInit{
  vendorForm: FormGroup;
  vendors: Vendor[] = [];
  vehicles: Vehicle[] = [];
  vendor = new FormControl('', [Validators.required]);
  vehicle = new FormControl('', [Validators.required]);

  constructor(private svc: VendorService) {
    this.vendorForm = new FormGroup({
      vendor: this.vendor,
      vehicle: this.vehicle,
    });
  }

  ngOnInit(): void {
    this.svc.getVendors().subscribe((vendors: Vendor[]) => {
      this.vendors = vendors;
      console.log(this.vendors);
    });

    this.vendor.valueChanges.subscribe((selectedVendorId: string | null) => {
      this.vehicle.reset();
      // this.vehicle.disable();
      if (selectedVendorId) {
        // const vendorId = Number(selectedVendorId);
        const selectedVendor = this.vendors.find(vendor => vendor.companyName === selectedVendorId);
        if (selectedVendor) {
          this.svc.getVendorVehicles(selectedVendor.id).subscribe((vehicles: Vehicle[]) => {
            this.vehicles = vehicles;
            console.log(this.vehicles);
          });
        }
      }
    });
  }
}



    // onselect(vendor:any){
    //   this.svc.getVendorVehicles(this.vendors.id).subscribe((response)=>{
    //     this.vehicles=response
    //     console.log(this.vehicles)
    //   })
    //   }
//       onInsertClick(){
//         this.insertStatus=true;
//       }
//       onUpdateClick(vendor: any) {
//         this.selectedVendor = vendor;
      
//         this.updateStatus = true;
//       }
      
// onDeleteClick(vendor: any) {
//   this.selectedVendor = vendor;
//   this.deleteStatus = true;
// }

//       addVehicle(vendor:any){
//         this.svc.addVehicle(vendor.id,this.vehicle).subscribe((response)=>{
//           console.log(response)
//     })
//   }
//   onUpdateDone(vendor:any){
//     this.svc.updateVendor(vendor.id,this.vendor).subscribe((response)=>{
//       console.log(response)
//     })
//   }
//   onDeleteDone(vendor:any){
//     this.svc.DeleteVendor(vendor.id).subscribe((response)=>{
//       console.log(response);
//     })
  // }

  
   


