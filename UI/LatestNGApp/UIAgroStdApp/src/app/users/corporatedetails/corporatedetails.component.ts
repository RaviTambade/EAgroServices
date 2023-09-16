import { Component, OnInit } from '@angular/core';
import { Corporation } from 'src/app/Models/corporation';
import { Role } from 'src/app/Models/role';
import { AuthenticationService } from 'src/app/Services/authentication.service';
import { CollectioncenterService } from 'src/app/Services/collectioncenter.service';
import { CorporateService } from 'src/app/Services/corporate.service';
import { MerchantService } from 'src/app/Services/merchant.service';
import { TransporterService } from 'src/app/Services/transporter.service';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-corporatedetails',
  templateUrl: './corporatedetails.component.html',
  styleUrls: ['./corporatedetails.component.css']
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
  roles: string[]=[];
  userId: number | undefined;
  constructor(
    private transportersvc: TransporterService,
    private collectioncentersvc: CollectioncenterService,
    private corporatesvc: CorporateService,
    private merchantsvc: MerchantService,
    private authsvc: AuthenticationService,
    private usersvc:UserService
  ) {}
  ngOnInit(): void {

    this.userId= Number(localStorage.getItem("userId"));
    console.log(this.userId);
    this.usersvc.getUserRole(this.userId).subscribe((res)=>{
      this.roles=res;

     let isExit:boolean= this.roles.includes("collection manager"||"merchant"||"transporter");
           })
       this.corporatesvc.getCorporateIdByPersonId().subscribe((corporateId)=>{
        
         this.corporatesvc.getCorporateDetails(corporateId).subscribe((response)=>{
          this.corporation=response
         })
       })   

    // this.roles = this.authsvc.getRolesFromToken();

    // if (this.authsvc.isTokenHaveRequiredRole(Role.collectionmanager)) {
    //   this.collectioncentersvc
    //     .getCorporateIdByCollectionCenterId()
    //     .subscribe((res) => {
    //       this.corporateId = res;
    //       this.corporatesvc
    //         .getCorporateDetails(this.corporateId)
    //         .subscribe((res) => {
    //           this.corporation = res;
    //           console.log(res);
    //         });
    //     });
    // } else if (this.authsvc.isTokenHaveRequiredRole(Role.transporter)) {
    //   this.transportersvc.getCorporateIdOfTransporter().subscribe((res) => {
    //     this.corporateId = res;
    //     this.corporatesvc
    //       .getCorporateDetails(this.corporateId)
    //       .subscribe((res) => {
    //         this.corporation = res;
    //         console.log(res);
    //       });
    //   });
    // } else if (this.authsvc.isTokenHaveRequiredRole(Role.merchant)) {
    //   this.merchantsvc.getMerchantCorporateId().subscribe((res) => {
    //     this.corporateId = res;
    //     this.corporatesvc
    //       .getCorporateDetails(this.corporateId)
    //       .subscribe((res) => {
    //         this.corporation = res;
    //         console.log(res);
    //       });
    //   });

    

    
    }
  }

