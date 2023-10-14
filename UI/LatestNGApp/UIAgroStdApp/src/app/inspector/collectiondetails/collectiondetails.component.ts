import { Component } from '@angular/core';
import { CollectionCenter } from 'src/app/Models/collectioncenter';
import { CollectionDetails } from 'src/app/Models/collectiondetails';
import { CommonService } from 'src/app/Services/Common.service';
import { FarmerService } from 'src/app/Services/farmer.service';
import { InspectorService } from 'src/app/Services/inspector.service';

@Component({
  selector: 'app-collectiondetails',
  templateUrl: './collectiondetails.component.html',
  styleUrls: ['./collectiondetails.component.css']
})
export class CollectiondetailsComponent {
  collectiontype:string='';
  selectedCollectionId: number | null = null;
  collectionDetails: CollectionDetails | any
  corporateName: CollectionCenter[] | any
  corporateId: any;
  requestDetails: any;
  details: boolean = false;
  collectionId: number | any;
  status:boolean=false;
  constructor(private farmerSvc: FarmerService, private commonSvc: CommonService,private inspectorsvc:InspectorService) { }
  ngOnInit(): void {
    if (this.selectedCollectionId !== null) {
      this.collectionId = this.selectedCollectionId;
      console.log(this.collectionId)
    }
    this.farmerSvc.selectedCollectionId$.subscribe((res) => {
      this.collectionId = res.collectionId;
      this.collectiontype=res.type;
      if (this.collectionId)
        this.farmerSvc.collectionDetail(this.collectionId).subscribe((response) => {
          console.log(this.collectionId)
          console.log(this.corporateId);
          this.collectionDetails = response;
          this.commonSvc.getCorporates(response.corporateId).subscribe((response) => {
            console.log(this.corporateId);
            this.corporateName = response[0].name
            console.log(response);
          })
          console.log(this.corporateId)
        })
    });
  }

  onClickVerify(id:number){
    this.status=true
    this.inspectorsvc.setVerifiedCollectionId(id)
  }

}
