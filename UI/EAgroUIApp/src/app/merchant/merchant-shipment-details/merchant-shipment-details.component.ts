import { Component, OnInit } from '@angular/core';
import { ShipmentService } from '../shipment.service';
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
  shipmentStatus: boolean | undefined;
  shipmentItemsDetails: ShipmentItemDetails[] = [];
  updateStatus: boolean = false;
  constructor(private shipmentsvc: ShipmentService, private corpsvc: CorporateService, private usrsvc: UserService,
    private route: ActivatedRoute, private router: Router) { }
  ngOnInit(): void {

    this.route.paramMap.subscribe((params) => {
      this.shipmentId = params.get('shipmentid');
    });
    this.shipmentsvc.getShipmentItems(this.shipmentId).subscribe((res) => {
      this.shipmentItemsDetails = res;

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

    });

    this.shipmentsvc.isShipmentStatusDelivered(this.shipmentId).subscribe((res) => {
      this.shipmentStatus = res;
      // this.shipmentStatus=true;
    })
  }

  removeItem(shipmentId: number) {
    this.shipmentsvc.removeShipmentItem(shipmentId).subscribe((response) => {
      if (response) {
        alert("record deleted");
        window.location.reload();
      }
    });
  }

  updateShipmentStatusDelivered(shipmentId: number) {
    this.shipmentsvc.updateShipmentStatus(shipmentId).subscribe((res) => {
      console.log(res);
      this.shipmentStatus = true;
    })
  }

  onCancelClick() {
    this.updateStatus = false;
  }
}
