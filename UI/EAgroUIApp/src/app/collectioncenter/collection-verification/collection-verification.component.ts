import { Component, Input, OnInit } from '@angular/core';
import { Collection } from '../collection';
import { CollectionService } from 'src/app/collection-service.service';

@Component({
  selector: 'app-collection-verification',
  templateUrl: './collection-verification.component.html',
  styleUrls: ['./collection-verification.component.css']
})
export class CollectionVerificationComponent  {
  @Input() collections: Collection[] = [];

  constructor(private collectionsvc: CollectionService) { }

  activeAction: 'verify' | 'update' | 'remove' | null = null;
  selectedCollectionId: number | null = null;

  onActionClick(action: 'verify' | 'update' | 'remove', collectionId: number) {
    if (this.activeAction === action && this.selectedCollectionId === collectionId) {
      this.activeAction = null;
      this.selectedCollectionId = null;
    } else {
      this.activeAction = action;
      this.selectedCollectionId = collectionId;
    }
  }

  onConfirmRemove(id: number) {
    this.collectionsvc.removeCollection(id).subscribe((res) => {
      window.location.reload();
    })
  }

  
}