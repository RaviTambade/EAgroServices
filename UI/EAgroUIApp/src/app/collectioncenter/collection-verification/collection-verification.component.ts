import { Component, Input, OnInit } from '@angular/core';
import { Collection } from 'src/app/Models/collection';
import { CollectionService } from 'src/app/Services/collection-service.service';
import { ShowButtonService } from 'src/app/Services/show-button-service.service';


@Component({
  selector: 'app-collection-verification',
  templateUrl: './collection-verification.component.html',
  styleUrls: ['./collection-verification.component.css']
})
export class CollectionVerificationComponent implements OnInit {
  @Input() collections: Collection[] = [];
  showActions: boolean = true

  constructor(private collectionsvc: CollectionService, private btnsvc: ShowButtonService) { }
  ngOnInit(): void {
    this.btnsvc.getShowButtonVisibility().subscribe((res) => {
      this.showActions = res;
    });
  }
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