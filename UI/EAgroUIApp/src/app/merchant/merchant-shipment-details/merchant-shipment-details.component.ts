import { Component, OnInit } from '@angular/core';
import { MerchantService } from '../merchant.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ShipmentItemDetails } from '../shipment-item-details';
import { CorporateService } from 'src/app/corporate.service';

@Component({
  selector: 'app-merchant-shipment-details',
  templateUrl: './merchant-shipment-details.component.html',
  styleUrls: ['./merchant-shipment-details.component.css']
})
export class MerchantShipmentDetailsComponent implements OnInit {
  shipmentId: any;
  shipmentItemsDetails: ShipmentItemDetails[] = [];
  corpNames:any[]=[]
  constructor(private svc: MerchantService, private corpsvc: CorporateService, private route: ActivatedRoute, private router: Router) { }
  ngOnInit(): void {

    this.route.paramMap.subscribe((params) => {
      this.shipmentId = params.get('shipmentid');
      console.log("🚀 ~ this.route.paramMap.subscribe ~ shipmentId:", this.shipmentId);
    });

    this.svc.getShipmentItems(this.shipmentId).subscribe((res) => {
      console.log("🚀 ~ this.svc.getShipmentItems ~ res:", res);
      this.shipmentItemsDetails = res;

      const collectionCenterIds = this.shipmentItemsDetails.map(item => item.collectionCenterId)
        .filter((number, index, array) => array.indexOf(number) === index);

      const distinctcollectionId = collectionCenterIds.join(',');
      console.log("🚀 ~ this.svc.getShipmentItems ~ distinctnumbers:", distinctcollectionId);
      
      this.corpsvc.getCorporates(distinctcollectionId).subscribe((names) => {
        console.log("🚀 ~ this.corpsvc.getCorporates ~ names:", names);
        this.corpNames=names
        this.shipmentItemsDetails.forEach(item => {
          const matchingItem = this.corpNames.find(element => element.id === item.collectionCenterId);
          if (matchingItem) {
            item.collectionCenterName = matchingItem.name;
          }
        });
        console.log("🚀 ~ this.corpsvc.getCorporates ~ shipmentItemsDetails:", this.shipmentItemsDetails);
      });

      

    });
  }
}
