import { Component, OnInit } from '@angular/core';
import { MerchantService } from '../merchant.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-merchant-shipment-details',
  templateUrl: './merchant-shipment-details.component.html',
  styleUrls: ['./merchant-shipment-details.component.css']
})
export class MerchantShipmentDetailsComponent implements OnInit {
  shipmentId: any;
  constructor(private svc: MerchantService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {

    this.route.paramMap.subscribe((params) => {
      this.shipmentId = params.get('shipmentid');
      console.log("🚀 ~ this.route.paramMap.subscribe ~ shipmentId:", this.shipmentId);
    });
    this.svc.getShipmentItems(this.shipmentId).subscribe((res) => {
      console.log("🚀 ~ this.svc.getShipmentItems ~ res:", res);
    });
}
}
