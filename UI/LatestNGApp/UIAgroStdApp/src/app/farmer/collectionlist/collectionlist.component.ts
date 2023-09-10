import { Component } from '@angular/core';
import { FarmerService } from 'src/app/Services/farmer.service';

@Component({
  selector: 'app-collectionlist',
  templateUrl: './collectionlist.component.html',
  styleUrls: ['./collectionlist.component.css']
})
export class CollectionlistComponent {
constructor(private farmersvc:FarmerService){}
  collectionDetails:any|undefined
  collections:any[] =[
                      {id:1,Date:'12-3-2023',Crop:'potato',Weight:'100kg'},
                      {id:2,Date:'12-3-2023',Crop:'cabage',Weight:'125kg'},
                      {id:3,Date:'12-3-2023',Crop:'beetroot',Weight:'156kg'},
                      {id:4,Date:'12-3-2023',Crop:'potato',Weight:'108kg'},
                      {id:5,Date:'12-3-2023',Crop:'tomato',Weight:'150kg'},
                    ];

  details(id:number){
    this.collectionDetails=this.farmersvc.collectionDetail(id);
  }
}
