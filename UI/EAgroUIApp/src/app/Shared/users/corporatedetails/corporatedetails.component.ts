import { Component, OnInit } from '@angular/core';
import { Corporation } from 'src/app/Models/corporation';
import { CollectioncenterService } from 'src/app/Services/collectioncenter.service';
import { CorporateService } from 'src/app/Services/corporate.service';
import { MerchantService } from 'src/app/Services/merchant.service';
import { TransporterService } from 'src/app/Services/transporter.service';
import { AuthService } from '../../authentication/auth.service';
import { Role } from 'src/app/Models/Enums/role';

@Component({
  selector: 'app-corporatedetails',
  templateUrl: './corporatedetails.component.html',
  styleUrls: ['./corporatedetails.component.css'],
})
export class CorporatedetailsComponent implements OnInit {
  corporateId: any;
  corporation: Corporation = {
    id: 0,
    name: '',
    contactNumber: '',
    email: '',
    personId: 0,
  };
  roles: string[] = [];
  constructor(
    private transportersvc: TransporterService,
    private collectioncentersvc: CollectioncenterService,
    private corporatesvc: CorporateService,
    private merchantsvc: MerchantService,
    private authsvc: AuthService
  ) {}
  ngOnInit(): void {
    this.roles = this.authsvc.getRolesFromToken();

    if (this.authsvc.isTokenHaveRequiredRole(Role.collectionmanager)) {
      this.collectioncentersvc
        .getCorporateIdByCollectionCenterId()
        .subscribe((res) => {
          this.corporateId = res;
          this.corporatesvc
            .getCorporateDetails(this.corporateId)
            .subscribe((res) => {
              this.corporation = res;
              console.log(res);
            });
        });
    } else if (this.authsvc.isTokenHaveRequiredRole(Role.transporter)) {
      this.transportersvc.getCorporateIdOfTransporter().subscribe((res) => {
        this.corporateId = res;
        this.corporatesvc
          .getCorporateDetails(this.corporateId)
          .subscribe((res) => {
            this.corporation = res;
            console.log(res);
          });
      });
    } else if (this.authsvc.isTokenHaveRequiredRole(Role.merchant)) {
      this.merchantsvc.getMerchantCorporateId().subscribe((res) => {
        this.corporateId = res;
        this.corporatesvc
          .getCorporateDetails(this.corporateId)
          .subscribe((res) => {
            this.corporation = res;
            console.log(res);
          });
      });
    }
  }
}
