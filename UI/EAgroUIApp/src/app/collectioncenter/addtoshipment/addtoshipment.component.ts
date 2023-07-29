import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CorporateService } from 'src/app/corporate.service';
import { UserRoleService } from 'src/app/user-role.service';
import { NameId } from 'src/app/name-id';
import { Shipment } from 'src/app/transporter/shipment';
import { ShipmentService } from 'src/app/merchant/shipment.service';
import { TransporterService } from 'src/app/transporter/transporter.service';
import { Vehiclenumberid } from 'src/app/transporter/vehiclenumberid';
import { MerchantService } from 'src/app/merchant/merchant.service';
@Component({
  selector: 'app-addtoshipment',
  templateUrl: './addtoshipment.component.html',
  styleUrls: ['./addtoshipment.component.css']
})
export class AddtoshipmentComponent implements OnInit {
  selectedMerchant:any
shipmentForm:FormGroup;
id:number |undefined;
merchants:NameId[] =[]
vehicles:Vehiclenumberid[]=[]
constructor(private formBuilder:FormBuilder,private userRoleSvc:UserRoleService,private crpSvc:CorporateService,private svc:ShipmentService,private trpSvc:TransporterService,public mrtSvc:MerchantService){
  this.shipmentForm=this.formBuilder.group({
    vehicleId:['', Validators.required],
    merchantId:['', Validators.required],
    kilometers:['',Validators.required],
  })
}
  ngOnInit(): void {
    this.userRoleSvc.getMerchantIds().subscribe((res)=>{
this.crpSvc.getCorporates(res).subscribe((merchants)=>{
  this.merchants=merchants
  this.selectedMerchant=merchants.find(m=>m)
  this.mrtSvc.getIdOfMerchant(this.selectedMerchant.id).subscribe((res)=>{
    this.id=res
        console.log(res)
  })
})
    })
this.trpSvc.getVehicleNumbers().subscribe((vehicles)=>{
  console.log(vehicles)
  this.vehicles=vehicles
})
  }
 
  OnSubmit(){
    if(this.shipmentForm.valid){
      let shipment:any={
        vehicleId: this.shipmentForm.get('vehicleId')?.value,
        merchantId: this.shipmentForm.get('merchantId')?.value,
        kilometers: this.shipmentForm.get('kilometers')?.value,
        status: this.shipmentForm.get('status')?.value,
        shipmentDate: this.shipmentForm.get('shipmentDate')?.value
      }
      console.log(shipment)
      this.svc.addShipment(shipment).subscribe((res)=>{
        console.log(shipment.id)
        console.log(shipment.kilometers)
        console.log(shipment.merchantId)
        console.log(shipment.vehicleId)
        console.log(shipment.shipmentDate)
        console.log(shipment.status)
       console.log(res)
      })
    }
    else {
      console.log('Form is invalid. Please check the input fields.');
    }
  }
}

