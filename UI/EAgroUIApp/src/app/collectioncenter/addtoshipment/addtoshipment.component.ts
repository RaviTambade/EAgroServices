import { Component, Input, OnInit } from '@angular/core';
import { ShipmentService } from 'src/app/Services/shipment.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InprogressVehicle } from 'src/app/Models/inprogress-vehicle';
import { ShipmentItem } from 'src/app/Models/shipment-item';
import { CorporateService } from 'src/app/Services/corporate.service';


@Component({
  selector: 'app-addtoshipment',
  templateUrl: './addtoshipment.component.html',
  styleUrls: ['./addtoshipment.component.css']
})
export class AddtoshipmentComponent implements OnInit {
  @Input() CollectionId: number | undefined
  shipmentItemForm: FormGroup;
  shipmentVehicleList: InprogressVehicle[] = []
  newShipmentStatus: boolean = false;
  componentViewStatus: boolean = true;

  constructor(
    private formbuilder: FormBuilder,
    private shipmentsvc: ShipmentService,
    private corporatesvc: CorporateService) {
    this.shipmentItemForm = this.formbuilder.group({
      shipmentId: ['', Validators.required],
    })
  }

  ngOnInit(): void {
    this.shipmentsvc.getInprogressShipments().subscribe((res) => {
      this.shipmentVehicleList = res;

      let distinctmerchantIds = this.shipmentVehicleList.map(item => item.merchantCorporateId)
        .filter((number, index, array) => array.indexOf(number) === index);
      let merchantIdString = distinctmerchantIds.join(',')
      this.corporatesvc.getCorporates(merchantIdString).subscribe((names) => {
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
    if (!this.CollectionId) {
      return
    }
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

