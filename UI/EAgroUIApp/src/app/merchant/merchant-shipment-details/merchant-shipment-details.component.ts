import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ShipmentService } from '../../Services/shipment.service';
import { ShipmentItemDetails } from 'src/app/Models/shipment-item-details';

@Component({
  selector: 'app-merchant-shipment-details',
  templateUrl: './merchant-shipment-details.component.html',
  styleUrls: ['./merchant-shipment-details.component.css'],
})
export class MerchantShipmentDetailsComponent implements OnInit {
  @Input() shipmentId!: number;
  @Output() refetchData = new EventEmitter();
  shipmentStatus: boolean | undefined;
  shipmentItemsDetails: ShipmentItemDetails[] = [];
  updateStatus: boolean = false;
  removeShipmentItemId: number | null = null;
  constructor(private shipmentsvc: ShipmentService) {}
  ngOnInit(): void {
    this.fetchShipmentItems();
  }

  fetchShipmentItems() {
    this.shipmentsvc.getShipmentItems(this.shipmentId).subscribe((res) => {
      this.shipmentItemsDetails = res;
    });

    this.shipmentsvc
      .isShipmentStatusDelivered(this.shipmentId)
      .subscribe((res) => {
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
        alert('record deleted');
        this.fetchShipmentItems();
      }
    });
  }

  updateShipmentStatusDelivered(shipmentId: number) {
    this.shipmentsvc.updateShipmentStatus(shipmentId).subscribe((res) => {
      if (res) {
        this.shipmentStatus = true;
        this.refetchData.emit();
      }
    });
  }

  onCancelClick() {
    this.removeShipmentItemId = null;
    this.updateStatus = false;
  }
}
