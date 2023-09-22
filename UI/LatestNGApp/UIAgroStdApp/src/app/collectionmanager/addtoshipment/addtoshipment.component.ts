import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { InprogressVehicle } from 'src/app/Models/inprogress-vehicle';
import { ShipmentItem } from 'src/app/Models/shipment-item';
import { CollectionmanagerService } from 'src/app/Services/collectionmanager.service';
import { CorporateService } from 'src/app/Services/corporate.service';
import { ShipmentService } from 'src/app/Services/shipment.service';

@Component({
  selector: 'app-addtoshipment',
  templateUrl: './addtoshipment.component.html',
  styleUrls: ['./addtoshipment.component.css']
})
export class AddtoshipmentComponent implements OnInit {
  formbuilder: any;
  collectionId: any;
  constructor(
    private shipmentsvc:ShipmentService,
    private corporatesvc:CorporateService,
    private managersvc:CollectionmanagerService){
       this.shipmentItemForm = this.formbuilder.group({
    shipmentId: ['', Validators.required],
  })
}
  // @Input() CollectionId: number | undefined;
  shipmentItemForm: FormGroup;
  newShipmentStatus: boolean = false;
  componentViewStatus: boolean = true;
  shipmentVehicleList:InprogressVehicle[]=[];
  ngOnInit(): void {
    this.managersvc.selectedCollectionIdShipment$.subscribe((collectionId) => {
      this.collectionId = collectionId;
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

  })

}

OnSubmit() {
  if (!this.collectionId) {
    return
  }
  const shipmentItem: ShipmentItem = {
    shipmentId: this.shipmentItemForm.get('shipmentId')?.value,
    collectionId: this.collectionId
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


