import { Component, OnInit } from '@angular/core';
import { MerchantService } from '../merchant.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ShipmentItemDetails } from '../shipment-item-details';
import { CorporateService } from 'src/app/corporate.service';
import { UserService } from 'src/app/Shared/users/user.service';

@Component({
  selector: 'app-merchant-shipment-details',
  templateUrl: './merchant-shipment-details.component.html',
  styleUrls: ['./merchant-shipment-details.component.css']
})
export class MerchantShipmentDetailsComponent implements OnInit {
  shipmentId: any;
  shipmentItemsDetails: ShipmentItemDetails[] = [];
  corporationNames: any[] = []
  farmerNames: any[] = []
  constructor(private svc: MerchantService, private corpsvc: CorporateService,private usrsvc:UserService, 
              private route: ActivatedRoute, private router: Router) { }
  ngOnInit(): void {

    this.route.paramMap.subscribe((params) => {
      this.shipmentId = params.get('shipmentid');
      console.log("🚀 ~ this.route.paramMap.subscribe ~ shipmentId:", this.shipmentId);
    });

    this.svc.getShipmentItems(this.shipmentId).subscribe((res) => {
      console.log("🚀 ~ this.svc.getShipmentItems ~ res:", res);
      this.shipmentItemsDetails = res;

      const distinctcollectionIds = this.shipmentItemsDetails.map(item => item.collectionCenterId)
        .filter((number, index, array) => array.indexOf(number) === index);

        const distinctfarmerIds = this.shipmentItemsDetails.map(item => item.farmerId)
        .filter((number, index, array) => array.indexOf(number) === index);

      const collectionIdString = distinctcollectionIds.join(',');
      console.log("🚀 ~ this.svc.getShipmentItems ~ collectionIdString:", collectionIdString);
      const farmerIdString = distinctfarmerIds.join(',');
      console.log("🚀 ~ this.svc.getShipmentItems ~ farmerIdString:", farmerIdString);

      this.corpsvc.getCorporates(collectionIdString).subscribe((names) => {
        console.log("🚀 ~ this.corpsvc.getCorporates ~ names:", names);
        this.corporationNames = names
        this.shipmentItemsDetails.forEach(item => {
          const matchingItem = this.corporationNames.find(element => element.id === item.collectionCenterId);
          item.collectionCenterName = matchingItem.name;
        });
        console.log("🚀 ~ this.corpsvc.getCorporates ~ shipmentItemsDetails:", this.shipmentItemsDetails);
      });

      this.usrsvc.getUserNamesWithId(farmerIdString).subscribe((names) => {
        this.farmerNames = names
        this.shipmentItemsDetails.forEach(item => {
          const matchingItem = this.farmerNames.find(element => element.id === item.farmerId);
          item.farmerName = matchingItem.name;
        });
        console.log("🚀 ~ this.usrsvc.getUserNamesWithId ~ shipmentItemsDetails:", this.shipmentItemsDetails);
      });

    });
  }
}
