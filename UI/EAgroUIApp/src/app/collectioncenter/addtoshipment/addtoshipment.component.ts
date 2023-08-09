import { Component, Input, OnInit } from '@angular/core';
import { InprogressVehicle } from '../inprogress-vehicle';
import { ShipmentService } from 'src/app/merchant/shipment.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ShipmentItem } from '../shipment-item';
import { CorporateService } from 'src/app/corporate.service';

@Component({
  selector: 'app-addtoshipment',
  templateUrl: './addtoshipment.component.html',
  styleUrls: ['./addtoshipment.component.css']
})
export class AddtoshipmentComponent implements OnInit {
  @Input() CollectionId!: number
  shipmentItemForm: FormGroup;
  shipmentVehicleList: InprogressVehicle[] = []
  newShipmentStatus: boolean = false;
  componentViewStatus: boolean = true;
  constructor(private formBuilder: FormBuilder, private shipmentsvc: ShipmentService, private corpsvc: CorporateService) {
    this.shipmentItemForm = this.formBuilder.group({
      shipmentId: ['', Validators.required],
    })
  }
  ngOnInit(): void {
    this.shipmentsvc.getInprogressShipments().subscribe((res) => {
      this.shipmentVehicleList = res;

      let distinctmerchantIds = this.shipmentVehicleList.map(item => item.merchantCorporateId)
        .filter((number, index, array) => array.indexOf(number) === index);
      let merchantIdString = distinctmerchantIds.join(',')
      this.corpsvc.getCorporates(merchantIdString).subscribe((names) => {
        let corporationNames = names
        this.shipmentVehicleList.forEach(item => {
          let matchingItem = corporationNames.find(element => element.id === item.merchantCorporateId);
          if (matchingItem != undefined)
            item.merchantName = matchingItem.name;
        });
      });

    })

  }

  OnSubmit() {
    const shipmentItem: ShipmentItem = {
      shipmentId: this.shipmentItemForm.get('shipmentId')?.value,
      collectionId: this.CollectionId
    }
    this.shipmentsvc.addShipmentItem(shipmentItem).subscribe((res) => {
      console.log(res)
      if (res)
        window.location.reload()
    })

  }

  onClicknewShipment() {
    if (this.newShipmentStatus == false) {
      this.newShipmentStatus = true;
    }

    else if (this.newShipmentStatus == true) {
      this.newShipmentStatus = false;
    }
  }

}

