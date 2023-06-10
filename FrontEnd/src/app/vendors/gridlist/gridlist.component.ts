import { Component, OnInit } from '@angular/core';
import { Collection } from '../collection';
import { Collectionviewmodel } from '../collectionviewmodel';
  import { VendorService } from '../vendor.service';

  @Component({
    selector: 'app-gridlist',
    templateUrl: './gridlist.component.html',
    styleUrls: ['./gridlist.component.css']
  })
export class GridlistComponent implements OnInit {
  collection:Collection |any;
  collectionviewmodel: Collectionviewmodel[] = [];
  selCollection: any;
  updateStatus: boolean = false;
  deleteStatus: boolean = false;
  viewStatus: boolean = false;
  results: any[] = [];
  currentPage = 0;
  arrLength = 0;
  isDisabledPrev=false;
  isDisabledNext=false;
  constructor(private svc: VendorService) {
    this.results=[],
  this.arrLength=this.collectionviewmodel.length
  }
  ngOnInit(): void{
    const startindex = this.currentPage * 5;
    const endindex = startindex + 5;  
    this.svc.GetCollections().subscribe((collections: Collectionviewmodel[]) => {
      this.collectionviewmodel = collections; 
      this.results = collections.slice(startindex, endindex);
      console.log(this.results);
      this.isDisabledPrev = true;
    })
  }
  next() {
    this.currentPage++;
      const startindex = this.currentPage * 5;
      const endindex = startindex + 5;
      this.results = this.collectionviewmodel.slice(startindex, endindex);
      this.isDisabledPrev = false;
      if (endindex <= this.arrLength)
      {
        this.isDisabledNext = true;
      }
    }
  previous() {
      this.currentPage--;
      const startindex = this.currentPage * 5;
      const endindex = startindex + 5;
      this.results = this.collectionviewmodel.slice(startindex, endindex);
      this.isDisabledNext = false;
      if (startindex <= 0) 
      {
        this.isDisabledPrev = true;
      }
  
}


   
  // onViewClick(collection:any){
  //   this.selCollection=collection;
  //   this.viewStatus=true
  // }
  onUpdateClick(collection: any) {
    this.selCollection = collection;
    this.updateStatus = true;
  }

  onDeleteClick(collection: any) {
    this.selCollection = collection;
    this.deleteStatus = true;
  }
  onViewDone(collectionId: any) {
    this.viewStatus = true;
    // console.log("hii");
    // if(collectionId){
    // const selCollection=this.collectionviewmodel.find(collection=>collection.collection.id===selCollection.collectionId)
    // }
    // this.svc.GetCollection(selCollection.collection.id).subscribe((response) => {
    //   console.log(collection.id)
    //   console.log(response)
    // })
  }
  onUpdateDone(collection: any) {
    this.svc.UpdateCollection(collection.id, this.collection).subscribe((response) => {
      console.log(response)
    })
  }
  onDeleteDone(collection: any) {
    this.svc.DeleteCollection(collection.id).subscribe((response) => {
      console.log(response);
    })
  }

}


