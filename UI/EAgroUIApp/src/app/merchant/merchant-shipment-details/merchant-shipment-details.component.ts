import { Component, Input, OnInit } from '@angular/core';
import { ShipmentService } from '../../Services/shipment.service';
import { ShipmentItemDetails } from 'src/app/Models/shipment-item-details';
import { CorporateService } from 'src/app/Services/corporate.service';
import { UserService } from 'src/app/Shared/users/user.service';


@Component({
  selector: 'app-merchant-shipment-details',
  templateUrl: './merchant-shipment-details.component.html',
  styleUrls: ['./merchant-shipment-details.component.css']
})
export class MerchantShipmentDetailsComponent implements OnInit {
  @Input() shipmentId!: number;
  shipmentStatus: boolean | undefined;
  shipmentItemsDetails: ShipmentItemDetails[] = [];
  updateStatus: boolean = false;
  removeShipmentItemId: number | null = null;
  constructor(private shipmentsvc: ShipmentService, private corpsvc: CorporateService, private usrsvc: UserService) { }
  ngOnInit(): void {
    this.fetchShipmentItems();
  }

  fetchShipmentItems() {
    this.shipmentsvc.getShipmentItems(this.shipmentId).subscribe((res) => {
      this.shipmentItemsDetails = res;
      if (this.shipmentItemsDetails.length != 0) {

        let distinctcollectioncenterIds = this.shipmentItemsDetails.map(item => item.collectionCenterCorporaterId)
          .filter((number, index, array) => array.indexOf(number) === index);

        let distinctfarmerIds = this.shipmentItemsDetails.map(item => item.farmerId)
          .filter((number, index, array) => array.indexOf(number) === index);

        let collectionCenterIdString = distinctcollectioncenterIds.join(',');
        let farmerIdString = distinctfarmerIds.join(',');

        this.corpsvc.getCorporates(collectionCenterIdString).subscribe((names) => {
          let corporationNames = names
          this.shipmentItemsDetails.forEach(item => {
            let matchingItem = corporationNames.find(element => element.id === item.collectionCenterCorporaterId);
            if (matchingItem != undefined)
              item.collectionCenterName = matchingItem.name;
          });
        });

        this.usrsvc.getUserNamesWithId(farmerIdString).subscribe((names) => {
          let farmerNames = names
          this.shipmentItemsDetails.forEach(item => {
            let matchingItem = farmerNames.find(element => element.id === item.farmerId);
            if (matchingItem != undefined)
              item.farmerName = matchingItem.name;
          });
        });
      }
    });

    this.shipmentsvc.isShipmentStatusDelivered(this.shipmentId).subscribe((res) => {
      this.shipmentStatus = res;
    });
  }

  onRemoveClick(shipmentItemId: number) {
    if (this.removeShipmentItemId === shipmentItemId) {
      this.removeShipmentItemId = null;
    } else {
      this.removeShipmentItemId = shipmentItemId;
    }
  }

  removeItem(shipmentId: number) {
    this.shipmentsvc.removeShipmentItem(shipmentId).subscribe((response) => {
      if (response) {
        alert("record deleted");
        this.fetchShipmentItems();
      }
    });
  }

  updateShipmentStatusDelivered(shipmentId: number) {
    this.shipmentsvc.updateShipmentStatus(shipmentId).subscribe((res) => {
      if (res)
        this.shipmentStatus = true;
    })
  }

  onCancelClick() {
    this.removeShipmentItemId = null;
    this.updateStatus = false;
  }
}
