import { Component, OnInit } from '@angular/core';
import { CollectionList } from 'src/app/Models/collectionlist';
import { FarmerService } from 'src/app/Services/farmer.service';

@Component({
  selector: 'app-collectionlist',
  templateUrl: './collectionlist.component.html',
  styleUrls: ['./collectionlist.component.css']
})
export class CollectionlistComponent implements OnInit {
constructor(private farmersvc:FarmerService){}
selectedCollectionId: number | null = null
  collectionDetails:any|undefined
  collectionslist:CollectionList[]|undefined

  ngOnInit(): void {
    this.farmersvc.collectionList().subscribe((response)=>{
      this.collectionslist=response;
      console.log(response);
    })
  }
 
  onClickDetails(collectionId: number) {
   
     this.farmersvc.setSelectedCollectionId(collectionId);
     console.log(collectionId);
  }
    }

  





