import { Component, Input, } from '@angular/core';
import { ShippedCollection } from '../shipped-collection';


@Component({
  selector: 'app-collection-shipment-list',
  templateUrl: './collection-shipment-list.component.html',
  styleUrls: ['./collection-shipment-list.component.css']
})
export class CollectionShipmentListComponent {
  @Input()collections: ShippedCollection[] = [];

}
