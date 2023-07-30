import { Component, OnInit } from '@angular/core';
import { ShippedCollection } from '../shipped-collection';
import { ShipmentService } from 'src/app/merchant/shipment.service';
import { ShipmentStatus } from 'src/app/merchant/shipment-status';
import { CorporateService } from 'src/app/corporate.service';
import { UserService } from 'src/app/Shared/users/user.service';

@Component({
  selector: 'app-collection-shipment-list',
  templateUrl: './collection-shipment-list.component.html',
  styleUrls: ['./collection-shipment-list.component.css']
})
export class CollectionShipmentListComponent implements OnInit {
  collections: ShippedCollection[] = [];
  constructor(private shipmentsvc: ShipmentService, private corpsvc: CorporateService, private usrsvc: UserService,) { }
  ngOnInit(): void {
    this.onInprogressClick();
  }

  onInprogressClick(){
    this.fetchCollections(ShipmentStatus.inprogress)
  }

  onDeliveredClick(){
    this.fetchCollections(ShipmentStatus.delivered)
  }

  fetchCollections(status: string) {
    this.shipmentsvc.getShippedCollections(status).subscribe((res) => {
      this.collections = res;
      if (this.collections.length != 0) {
        let distinctcollectioncenterIds = this.collections.map(item => item.collectionCenterCorporateId)
          .filter((number, index, array) => array.indexOf(number) === index);

        let distinctMerchantIds = this.collections.map(item => item.merchantCorporateId)
          .filter((number, index, array) => array.indexOf(number) === index);

        let distinctTransporterIds = this.collections.map(item => item.transporterCorporateId)
          .filter((number, index, array) => array.indexOf(number) === index);


        let distinctfarmerIds = this.collections.map(item => item.farmerId)
          .filter((number, index, array) => array.indexOf(number) === index);

        let collectionCenterIdString = distinctcollectioncenterIds.join(',');
        let farmerIdString = distinctfarmerIds.join(',');
        let merchantIdString = distinctMerchantIds.join(',');
        let transporterIdString = distinctTransporterIds.join(',');

        this.corpsvc.getCorporates(collectionCenterIdString).subscribe((names) => {
          let corporationNames = names
          this.collections.forEach(item => {
            let matchingItem = corporationNames.find(element => element.id === item.collectionCenterCorporateId);
            if (matchingItem != undefined)
              item.collectionCenterName = matchingItem.name;
          });
        });

        this.corpsvc.getCorporates(merchantIdString).subscribe((names) => {
          let corporationNames = names
          this.collections.forEach(item => {
            let matchingItem = corporationNames.find(element => element.id === item.merchantCorporateId);
            if (matchingItem != undefined)
              item.merchantName = matchingItem.name;
          });
        });

        this.corpsvc.getCorporates(transporterIdString).subscribe((names) => {
          let corporationNames = names
          this.collections.forEach(item => {
            let matchingItem = corporationNames.find(element => element.id === item.transporterCorporateId);
            if (matchingItem != undefined)
              item.transporteName = matchingItem.name;
          });
        });

        this.usrsvc.getUserNamesWithId(farmerIdString).subscribe((names) => {
          let farmerNames = names
          this.collections.forEach(item => {
            let matchingItem = farmerNames.find(element => element.id === item.farmerId);
            if (matchingItem != undefined)
              item.farmerName = matchingItem.name;
          });
        });
      }
    });
  }
}
