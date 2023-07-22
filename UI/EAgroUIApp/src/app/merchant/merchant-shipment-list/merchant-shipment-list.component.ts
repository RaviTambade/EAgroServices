import { Component, OnInit } from '@angular/core';
import { ShipmentService } from '../shipment.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MerchantShipment } from '../merchant-shipment';
import { PaymentService } from 'src/app/payment.service';

@Component({
  selector: 'merchant-shipment-list',
  templateUrl: './merchant-shipment-list.component.html',
  styleUrls: ['./merchant-shipment-list.component.css']
})
export class MerchantShipmentListComponent implements OnInit {

  merchantShipments: MerchantShipment[] | undefined;
  constructor(private svc: ShipmentService,
     private route: ActivatedRoute, private router: Router) { }
  ngOnInit(): void {
    this.svc.getShipments("inprogress").subscribe((res) => {
      console.log("🚀 ~ this.svc.getShipments ~ res:", res);
      this.merchantShipments = res;

    });
  }

  onClickShipmentDetails(shipmentId: number) {
    this.router.navigate(['/merchant/shipmentdetails', shipmentId]);
  }


  onClickDelivered() {
    this.svc.getShipments("delivered").subscribe((res) => {
      console.log("🚀 ~ this.svc.getShipments ~ res:", res);
      this.merchantShipments = res;

    });
  }

  onClickInprogress() {
    this.svc.getShipments("inprogress").subscribe((res) => {
      console.log("🚀 ~ this.svc.getShipments ~ res:", res);
      this.merchantShipments = res;

    });
  }

  onClickpaymentDetails(shipmentId:number){
    this.router.navigate(['/merchant/shipment/payment', shipmentId]);
  }
}
