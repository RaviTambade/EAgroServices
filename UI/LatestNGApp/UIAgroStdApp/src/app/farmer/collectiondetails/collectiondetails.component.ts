import { Component, Input, OnInit } from '@angular/core';
import { CollectionCenter } from 'src/app/Models/collectioncenter';
import { CollectionDetails } from 'src/app/Models/collectiondetails';
import { CommonService } from 'src/app/Services/Common.service';
import { FarmerService } from 'src/app/Services/farmer.service';

@Component({
  selector: 'app-collectiondetails',
  templateUrl: './collectiondetails.component.html',
  styleUrls: ['./collectiondetails.component.css']
})
export class CollectiondetailsComponent implements OnInit {
 selectedCollectionId: number| null = null;
  collectionDetails:CollectionDetails|undefined
  corporateName:CollectionCenter[]|any
  corporateId:any;
  requestDetails: any; 
  details:boolean=false;
  collectionId:number|any;
constructor(private farmerSvc:FarmerService,private commonSvc:CommonService){}
  ngOnInit(): void {
    if(this.selectedCollectionId!==null){
      this.collectionId =this.selectedCollectionId;
      console.log(this.collectionId)
    }
    this.farmerSvc.selectedCollectionId$.subscribe((collectionId) => {
      this.collectionId = collectionId;
      if(this.collectionId)
      this.farmerSvc.collectionDetail(this.collectionId).subscribe((response)=>{
        console.log(this.collectionId)
        console.log(this.corporateId);
        this.collectionDetails=response;
        this.commonSvc.getCorporates(response.corporateId).subscribe((response)=> {
          console.log(this.corporateId);
          this.corporateName=response[0].name
          console.log(response);
        })
        console.log(this.corporateId)
      })
    }); 
  }
 onClickInvoiceDetails(id:number){
  if (this.selectedCollectionId === id) {
    this.selectedCollectionId = null;
  } else {
    this.selectedCollectionId = id;
  }
  if (this.selectedCollectionId === null) {
    alert(" This collection is not Verified !!!");
}
} 
}
