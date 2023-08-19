import { Component, OnInit } from '@angular/core';
import { ShipmentService } from '../shipment.service';
import { MerchantShipment } from '../merchant-shipment';


@Component({
  selector: 'merchant-shipment-list',
  templateUrl: './merchant-shipment-list.component.html',
  styleUrls: ['./merchant-shipment-list.component.css']
})
export class MerchantShipmentListComponent implements OnInit {
  paidDeliveredStatus: boolean = false;
  unpaidDeliveredStatus: boolean = false;
  merchantShipments: MerchantShipment[] | undefined;

  selectedDetailsShipmentId: number | null = null;
  selectedPaymentShipmentId: number | null = null;

  constructor(private svc: ShipmentService) { }
  ngOnInit(): void {
    this.onClickInprogress();
  }

  onClickShipmentDetails(shipmentId: number) {
    if (this.selectedDetailsShipmentId === shipmentId) {
      this.selectedDetailsShipmentId = null;

    } else {
      this.selectedDetailsShipmentId = shipmentId;
      this.selectedPaymentShipmentId = null;

    }
  }

  onClickpaymentDetails(shipmentId: number) {
    if (this.selectedPaymentShipmentId === shipmentId) {
      this.selectedPaymentShipmentId = null;
    } else {
      this.selectedPaymentShipmentId = shipmentId;
      this.selectedDetailsShipmentId = null;

    }
  }

  



  onClickUnpaidDelivered() {
    this.unpaidDeliveredStatus = true;
    this.paidDeliveredStatus = false;
    this.svc.getDeliveredShipmentByMerchant("UnPaid").subscribe((res) => {
      this.merchantShipments = res;
    });
  }
  onClickPaidDelivered() {
    this.paidDeliveredStatus = true;
    this.unpaidDeliveredStatus = false;
    this.svc.getDeliveredShipmentByMerchant("Paid").subscribe((res) => {
      this.merchantShipments = res;
    });
  }

  onClickInprogress() {
    this.paidDeliveredStatus = false;
    this.unpaidDeliveredStatus = false;
        this.svc.getInprogressShipmentsByMerchant().subscribe((res) => {
      this.merchantShipments = res;
    });
  }

  
}
