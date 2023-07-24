import { Component, Input } from '@angular/core';
import { UnverifiedCollection } from '../unverified-collection';
import { CollectionService } from 'src/app/collection-service.service';

@Component({
  selector: 'app-collectionverification-details',
  templateUrl: './collectionverification-details.component.html',
  styleUrls: ['./collectionverification-details.component.css']
})
export class CollectionverificationDetailsComponent {
  @Input() collection!: UnverifiedCollection
  updateStatus: boolean = false;
  verifyStatus: boolean = false;
  removeStatus: boolean = false;

  constructor(private collectionsvc:CollectionService){}
  onUpdateClick() {
    if (this.updateStatus == false) {
      this.updateStatus = true;
      this.verifyStatus = false;
    }

    else if (this.updateStatus == true) {
      this.updateStatus = false;
      this.verifyStatus = false;
    }
  }

  onVerifyClick() {
    if (this.verifyStatus == false) {
      this.verifyStatus = true;
      this.updateStatus = false;
    }
    else if (this.verifyStatus == true) {
      this.verifyStatus = false;
      this.updateStatus = false;
    }
  }

  onRemoveClick() {
    this.removeStatus = true;
  }

  onConfirmRemove(id:number) {
    this.collectionsvc.removeCollection(id).subscribe((res)=>{
      window.location.reload();
    })
  }

  onCancelClick(){
    this.removeStatus=false;
  }
}
