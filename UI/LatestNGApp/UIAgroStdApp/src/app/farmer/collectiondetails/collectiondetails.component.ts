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
  collectionDetails:CollectionDetails[]|undefined
  @Input() collectionId!: number;
  corporateName:CollectionCenter[]|any
  corporateId:any;
constructor(private farmerSvc:FarmerService,private commonSvc:CommonService){}
  ngOnInit(): void {
    this.collectionDetail()
    // this.collectionCenterName()
  }
collectionDetail(){
    this.farmerSvc.collectionDetail(this.collectionId).subscribe((response)=>{
      console.log(this.collectionId);
      // this.collectionDetails=response;
      // this.corporateId=Number(corporateId);
      console.log(this.corporateId);
      this.commonSvc.getCollectionCenterName(response.corporateId).subscribe((response)=> {
        console.log(this.corporateId);
        this.corporateName=response[0].name
        console.log(response);
      })
      console.log(this.corporateId)
    })
  }
  // collectionCenterName(){
  
  // }
  }
