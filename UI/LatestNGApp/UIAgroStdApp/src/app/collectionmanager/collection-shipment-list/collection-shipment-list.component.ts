import { Component, Input, OnInit } from '@angular/core';
import { ShippedCollection } from 'src/app/Models/shipped-collection';
import { ShipmentService } from 'src/app/Services/shipment.service';

@Component({
  selector: 'app-collection-shipment-list',
  templateUrl: './collection-shipment-list.component.html',
  styleUrls: ['./collection-shipment-list.component.css'],
})
export class CollectionShipmentListComponent implements OnInit {
  collectionCenterId: number = 1;
  status: string = 'inprogress';
  collections: ShippedCollection[] = [];
  constructor(private shipmentSvc: ShipmentService) {}
  ngOnInit(): void {
    this.shipmentSvc
      .getShippedCollectionsByStatus(this.collectionCenterId, this.status)
      .subscribe((res) => {
        console.log(res);
        this.collections = res;
      });
  }
}
