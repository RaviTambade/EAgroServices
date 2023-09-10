import { Component } from '@angular/core';
import { FarmerService } from 'src/app/Services/farmer.service';

@Component({
  selector: 'app-collectiondetails',
  templateUrl: './collectiondetails.component.html',
  styleUrls: ['./collectiondetails.component.css']
})
export class CollectiondetailsComponent {
  collectionDetails:any|undefined
constructor(private farmerSvc:FarmerService){}
  details(id:number){
    this.collectionDetails=this.farmerSvc.collectionDetail(id);
  }
}
