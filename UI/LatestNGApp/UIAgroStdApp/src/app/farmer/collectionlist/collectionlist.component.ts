import { Component, OnInit } from '@angular/core';
import { CollectionList } from 'src/app/Models/collectionlist';
import { FarmerService } from 'src/app/Services/farmer.service';

@Component({
  selector: 'app-collectionlist',
  templateUrl: './collectionlist.component.html',
  styleUrls: ['./collectionlist.component.css']
})
export class CollectionlistComponent implements OnInit {
  constructor(private farmersvc: FarmerService) { }
  selectedCollectionId: number | null = null
  collectionDetails: any | undefined
  collectionslist: CollectionList[] =[]
  // collectionslist: any[] = []; // Replace with your actual data
  showVerified: boolean = true;
  showUnverified: boolean = false;

  get filteredCollections() {
    if(this.collectionslist.length > 0){
    return this.collectionslist.filter((collection: { status: string; }) => {
      if (this.showVerified && this.showUnverified) {
        return true; // Show all collections when both checkboxes are selected
      } else if (this.showVerified) {
        return collection.status === 'Verified';
      } else if (this.showUnverified) {
        return collection.status === 'Unverified';
      } else {
        return false; // Hide all collections when both checkboxes are deselected
      } 
    })
  }
  return [];
  }

  ngOnInit(): void {
   this.getCollectionList();
  }
getCollectionList(){
  this.farmersvc.collectionList().subscribe((response) => {
    this.collectionslist = response;
    console.log(response);
    if(response.length > 0)
    {
    this.farmersvc.setSelectedCollectionId(response[0].collectionId,"");
    }
  })
}
  onClickDetails(collectionId: number) {
    this.farmersvc.selectedCollectionId(collectionId);
    console.log(collectionId);
  }
}







