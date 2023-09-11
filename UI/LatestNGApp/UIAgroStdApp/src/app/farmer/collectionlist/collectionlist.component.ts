import { Component } from '@angular/core';
import { CollectionList } from 'src/app/Models/collectionlist';
import { FarmerService } from 'src/app/Services/farmer.service';

@Component({
  selector: 'app-collectionlist',
  templateUrl: './collectionlist.component.html',
  styleUrls: ['./collectionlist.component.css']
})
export class CollectionlistComponent {
constructor(private farmersvc:FarmerService){}
  collectionDetails:any|undefined
  collectionslist:CollectionList[]|undefined

  details(id:number){
    this.collectionDetails=this.farmersvc.collectionDetail(id);
  }


  collectionList(farmerId:number){
    this.farmersvc.collectionList(farmerId).subscribe((response)=>{
      this.collectionslist=response;
      console.log(response);

    })

  }
}




