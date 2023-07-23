import { Component, Input } from '@angular/core';
import { UnverifiedCollection } from '../unverified-collection';

@Component({
  selector: 'app-collectionverification-details',
  templateUrl: './collectionverification-details.component.html',
  styleUrls: ['./collectionverification-details.component.css']
})
export class CollectionverificationDetailsComponent {
  @Input() collection!:UnverifiedCollection
  updateStatus:boolean=false;

  onUpdateClick(){
    if(this.updateStatus==false)
    this.updateStatus=true;

    else if(this.updateStatus==true){
      this.updateStatus=false;
    }
  }
}
