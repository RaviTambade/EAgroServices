import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CorporateService } from 'src/app/corporate.service';
import { UserRoleService } from 'src/app/user-role.service';
import { NameId } from 'src/app/name-id';
import { Shipment } from 'src/app/transporter/shipment';
import { ShipmentService } from 'src/app/merchant/shipment.service';
@Component({
  selector: 'app-addtoshipment',
  templateUrl: './addtoshipment.component.html',
  styleUrls: ['./addtoshipment.component.css']
})
export class AddtoshipmentComponent implements OnInit {
shipmentForm:FormGroup;
merchants:NameId[] =[]
constructor(private formBuilder:FormBuilder,private userRoleSvc:UserRoleService,private crpSvc:CorporateService,private svc:ShipmentService){
  this.shipmentForm=this.formBuilder.group({
    vehicleId:['', Validators.required],
    merchantId:['', Validators.required],
    kilometers:['',Validators.required],
    status:['',Validators.required],
    shipmentDate:['',Validators.required]
  })
}
  ngOnInit(): void {
    this.userRoleSvc.getMerchantIds().subscribe((res)=>{
this.crpSvc.getCorporates(res).subscribe((merchants)=>{
  this.merchants=merchants
})

    })
   
  }
  OnSubmit(){
    if(this.shipmentForm.valid){
      let shipment:Shipment={
        vehicleId: this.shipmentForm.get('vehicleId')?.value,
        merchantId: this.shipmentForm.get('merchantId')?.value,
        kilometers: this.shipmentForm.get('kilometers')?.value,
        status: this.shipmentForm.get('status')?.value,
        shipmentDate: this.shipmentForm.get('shipmentDate')?.value,
        id: ''
      }
      this.svc.addShipment(shipment).subscribe((res)=>{
       console.log(res)
      })
    }
    else {
      console.log('Form is invalid. Please check the input fields.');
    }
  }

}
