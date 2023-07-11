import { Component, OnInit } from '@angular/core';
import { MerchantService } from '../merchant.service';
import { ActivatedRoute,  Router } from '@angular/router';
import { MerchantShipment } from '../merchant-shipment';

@Component({
  selector: 'merchant-shipment-list',
  templateUrl: './merchant-shipment-list.component.html',
  styleUrls: ['./merchant-shipment-list.component.css']
})
export class MerchantShipmentListComponent implements OnInit {

merchantShipments:MerchantShipment[]|undefined;

  constructor(private svc :MerchantService,private route:ActivatedRoute, private router:Router){}
  ngOnInit(): void {
   this.svc.getShipments().subscribe((res) => {
     console.log("🚀 ~ this.svc.getShipments ~ res:", res);
     this.merchantShipments=res;
 
   	});
  }

  onClickShipmentDetails(shipmentId:number){
    this.router.navigate(['/merchant/shipmentdetails',shipmentId]);
  }

}
