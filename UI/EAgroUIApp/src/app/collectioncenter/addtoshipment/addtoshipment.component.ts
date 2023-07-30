import { Component, Input, OnInit } from '@angular/core';
import { InprogressVehicle } from '../inprogress-vehicle';
import { ShipmentService } from 'src/app/merchant/shipment.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ShipmentItem } from '../shipment-item';

@Component({
  selector: 'app-addtoshipment',
  templateUrl: './addtoshipment.component.html',
  styleUrls: ['./addtoshipment.component.css']
})
export class AddtoshipmentComponent implements OnInit {
  @Input() CollectionId!: number
  shipmentItemForm: FormGroup;
  shipmentVehicleList: InprogressVehicle[] = []
  newShipmentStatus:boolean=false;
  componentViewStatus:boolean=true;
  constructor(private formBuilder: FormBuilder, private shipmentsvc: ShipmentService) {
    this.shipmentItemForm = this.formBuilder.group({
      shipmentId: ['', Validators.required],
    })
  }
  ngOnInit(): void {
    this.shipmentsvc.getInprogressShipments().subscribe((res) => {
      this.shipmentVehicleList = res;
    })

  }

  OnSubmit() {
    const shipmentItem:ShipmentItem={
      shipmentId: this.shipmentItemForm.get('shipmentId')?.value,
      collectionId: this.CollectionId
    }
    this.shipmentsvc.addShipmentItem(shipmentItem).subscribe((res)=>{
      console.log(res)
      if(res)
      window.location.reload()
    })

  }

  onClicknewShipment(){
    if (this.newShipmentStatus == false) {
      this.newShipmentStatus = true;
    }

    else if (this.newShipmentStatus == true) {
      this.newShipmentStatus = false;
    }
  }

}

