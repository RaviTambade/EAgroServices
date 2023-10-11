import { Component, OnInit } from '@angular/core';
import { MerchantShipment } from 'src/app/Models/merchant-shipment';
import { ShipmentService } from 'src/app/Services/shipment.service';

@Component({
  selector: 'app-shipmentlist',
  templateUrl: './shipmentlist.component.html',
  styleUrls: ['./shipmentlist.component.css']
})
export class ShipmentlistComponent implements OnInit {
  paidDeliveredStatus: boolean = false;
  unpaidDeliveredStatus: boolean = false;
  merchantShipments: MerchantShipment[] | undefined;

  selectedDetailsShipmentId: number | null = null;
  selectedPaymentShipmentId: number | null = null;
  isLoading: boolean = false;
  constructor(private shipmentsvc: ShipmentService) {}
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
    this.isLoading = true;
    this.shipmentsvc.getDeliveredShipmentByMerchant('UnPaid').subscribe((res) => {
      this.merchantShipments = res;
      this.isLoading = false;
    });
  }
  onClickPaidDelivered() {
    this.paidDeliveredStatus = true;
    this.unpaidDeliveredStatus = false;
    this.isLoading = true;
    this.shipmentsvc.getDeliveredShipmentByMerchant('Paid').subscribe((res) => {
      this.merchantShipments = res;
      this.isLoading = false;
    });
  }

  onClickInprogress() {
    this.paidDeliveredStatus = false;
    this.unpaidDeliveredStatus = false;
    this.isLoading = true;
    console.log(this.merchantShipments?.length);
    setTimeout(()=>{
  
      this.shipmentsvc.getInprogressShipmentsByMerchant().subscribe((res) => {
        this.merchantShipments = res;
        console.log(this.merchantShipments);
        this.isLoading = false;
      });
    },4000)
    
  }

  isDataLoaded() {
    if (!this.merchantShipments?.length && this.isLoading == false) {
      return false;
    }
    console.log((!this.merchantShipments?.length && this.isLoading == false))
    return true;
  }
}
