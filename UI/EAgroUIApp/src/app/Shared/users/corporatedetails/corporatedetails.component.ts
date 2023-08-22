import { Component, OnInit } from '@angular/core';
import { CollectioncenterService } from 'src/app/collectioncenter.service';
import { CorporateService } from 'src/app/corporate.service';
import { Corporation } from 'src/app/membership/corporation';
import { MerchantService } from 'src/app/merchant/merchant.service';
import { TransporterService } from 'src/app/transporter/transporter.service';

@Component({
  selector: 'app-corporatedetails',
  templateUrl: './corporatedetails.component.html',
  styleUrls: ['./corporatedetails.component.css']
})
export class CorporatedetailsComponent implements OnInit {
  corporateId: any
  corporation: Corporation = {
    id: 0,
    name: '',
    contactNumber: '',
    email: '',
    personId: 0
  }
  constructor(private transportSvc: TransporterService,
    private collectionCenterSvc: CollectioncenterService,
    private crpSvc: CorporateService,
    private merchantSvc: MerchantService
  ) { }
  ngOnInit(): void {
    let role = localStorage.getItem("role")
    if (role == 'collection manager') {
      this.collectionCenterSvc.getCorporateIdByCollectionCenterId().subscribe((res) => {
        this.corporateId = res
        this.crpSvc.getCorporateDetails(this.corporateId).subscribe((res) => {
          this.corporation = res
          console.log(res)
        })
      })
    }
    if (role == 'transporter') {
      this.transportSvc.getCorporateIdOfTransporter().subscribe((res) => {
        this.corporateId = res
        this.crpSvc.getCorporateDetails(this.corporateId).subscribe((res) => {
          this.corporation = res
          console.log(res)
        })
      })
    }
    if (role == 'merchant') {
      this.merchantSvc.getMerchantCorporateId().subscribe((res) => {
        this.corporateId = res
        this.crpSvc.getCorporateDetails(this.corporateId).subscribe((res) => {
          this.corporation = res
          console.log(res)
        })
      })
    }
  }
}
