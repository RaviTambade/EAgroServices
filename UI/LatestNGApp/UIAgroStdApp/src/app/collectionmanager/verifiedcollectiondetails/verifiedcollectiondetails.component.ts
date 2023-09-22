import { Component, OnInit } from '@angular/core';
import { Verifiedcollectiondetails } from 'src/app/Models/verifieddcollectiondetails';
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
  farmerName: string = '';
  inspectorName: string = '';
  constructor(private colmsvc: CollectionmanagerService, private farsvc: FarmerService) { }
  collectionDetails: Verifiedcollectiondetails | undefined;
  ngOnInit(): void {
    this.colmsvc.selectedCollectionId$.subscribe((collectionId) => {
      this.collectionId = collectionId;
      console.log(collectionId);
      if (this.collectionId)
        this.colmsvc.getVerifiedCollectionDetails(collectionId).subscribe((response) => {
          this.collectionDetails = response
          console.log(response)
          console.log(response.farmerId);
          this.colmsvc.getUser(response.farmerId.toString()).subscribe((response) => {
            this.farmerName = response[0].name
          })
          this.colmsvc.getUser(response.inspectorId.toString()).subscribe((response) => {
            this.inspectorName = response[0].name
          })
        })
    })
  }

}
