import { Component, OnInit } from '@angular/core';
import { ShipmentService } from '../shipment.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MerchantShipment } from '../merchant-shipment';
import { PaymentService } from 'src/app/payment.service';
import { ShipmentStatus } from '../shipment-status';

@Component({
  selector: 'merchant-shipment-list',
  templateUrl: './merchant-shipment-list.component.html',
  styleUrls: ['./merchant-shipment-list.component.css']
})
export class MerchantShipmentListComponent implements OnInit {
  deliveredStatus: boolean = false;
  merchantShipments: MerchantShipment[] | undefined;

  selectedDetailsShipmentId: number | null = null;
  selectedPaymentShipmentId: number | null = null;



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

  constructor(private svc: ShipmentService,
    private route: ActivatedRoute, private router: Router) { }
  ngOnInit(): void {
    this.svc.getShipments(ShipmentStatus.inprogress).subscribe((res) => {
      console.log("🚀 ~ this.svc.getShipments ~ res:", res);
      this.merchantShipments = res;

    });
  }



  onClickDelivered() {
    this.deliveredStatus = true;
    this.svc.getShipments(ShipmentStatus.delivered).subscribe((res) => {
      console.log("🚀 ~ this.svc.getShipments ~ res:", res);
      this.merchantShipments = res;

    });
  }

  onClickInprogress() {
    this.deliveredStatus = false;
    this.svc.getShipments(ShipmentStatus.inprogress).subscribe((res) => {
      console.log("🚀 ~ this.svc.getShipments ~ res:", res);
      this.merchantShipments = res;

    });
  }

  // onClickpaymentDetails(shipmentId:number){
  //   this.router.navigate(['/merchant/shipment/payment', shipmentId]);
  // }
}
