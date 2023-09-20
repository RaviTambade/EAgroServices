import { Component, OnInit } from '@angular/core';
import { CollectionDetails } from 'src/app/Models/collectiondetails';
import { Verifieddcollectiondetails } from 'src/app/Models/verifieddcollectiondetails';
import { CollectionmanagerService } from 'src/app/Services/collectionmanager.service';
import { FarmerService } from 'src/app/Services/farmer.service';

@Component({
  selector: 'app-verifiedcollectiondetails',
  templateUrl: './verifiedcollectiondetails.component.html',
  styleUrls: ['./verifiedcollectiondetails.component.css']
})
export class VerifiedcollectiondetailsComponent implements OnInit {
  selectedCollectionId: null | undefined;
  collectionId: any;
  constructor(private colmsvc: CollectionmanagerService, private farsvc: FarmerService) { }
  collectionDetails: Verifieddcollectiondetails | undefined;
  ngOnInit(): void {
    if (this.selectedCollectionId !== null) {
      this.collectionId = this.selectedCollectionId;
      console.log(this.collectionId)
    }
    this.colmsvc.selectedCollectionId$.subscribe((collectionId) => {
      this.collectionId = collectionId;
      if (this.collectionId)
        this.farsvc.collectionDetail(collectionId).subscribe((response) => {
          this.collectionDetails = response
        })

    })
  }

}
