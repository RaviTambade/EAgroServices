import { Component, Input, OnInit } from '@angular/core';
import { CollectionDetail } from 'src/app/Models/collection-details';


@Component({
  selector: 'collectioncenter-verified-collection-list',
  templateUrl: './collection-list.component.html',
  styleUrls: ['./collection-list.component.css']
})
export class CollectionListComponent {
  @Input() collections: CollectionDetail[] = [];
  selectedCollectionId: number | null = null;

  onAddToShipment(collectionId: number) {
    if (this.selectedCollectionId === collectionId) {
      this.selectedCollectionId = null;
    } else {
      this.selectedCollectionId = collectionId;
    }
  }
}
