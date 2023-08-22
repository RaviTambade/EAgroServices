import { Component, OnInit } from '@angular/core';
import { CollectioncenterService } from 'src/app/collectioncenter.service';
import { CorporateService } from 'src/app/corporate.service';
import { Corporation } from 'src/app/membership/corporation';

@Component({
  selector: 'app-corporatedetails',
  templateUrl: './corporatedetails.component.html',
  styleUrls: ['./corporatedetails.component.css']
})
export class CorporatedetailsComponent implements OnInit {
corporateId:any
corporation:Corporation ={
  id: 0,
  name: '',
  contactNumber: '',
  email: '',
  personId: 0
}
constructor(private collectionCenterSvc:CollectioncenterService,private crpSvc:CorporateService
){}
  ngOnInit(): void {
   this.collectionCenterSvc.getCorporateIdByCollectionCenterId().subscribe((res)=>{
    this.corporateId=res
    this.crpSvc.getCorporateDetails(this.corporateId).subscribe((res)=>{
      this.corporation=res
      console.log(res)
    })

   })
  }
}
