import { Component, OnInit } from '@angular/core';
import { Corporation } from '../corporation';
import { CorporateService } from 'src/app/corporate.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserRole } from '../user-role';
import { NameId } from 'src/app/name-id';
import { MembershipService } from '../membership.service';
import { MerchantService } from 'src/app/merchant/merchant.service';
import { Merchant } from 'src/app/merchant/merchant';
import { TransporterService } from 'src/app/transporter/transporter.service';
import { Transporter } from 'src/app/transporter/transporter';
import { Collectioncenter } from 'src/app/collectioncenter';
import { CollectioncenterService } from 'src/app/collectioncenter.service';

@Component({
  selector: 'app-register-corporate',
  templateUrl: './register-corporate.component.html',
  styleUrls: ['./register-corporate.component.css']
})
export class RegisterCorporateComponent implements OnInit {

  personId: any;
  corporation: Corporation = {
    id: 0,
    name: '',
    contactNumber: '',
    email: '',
    personId: 0,
  };
  userRole: UserRole = {
    userId: 0,
    roleId: 0
  }

  roles: NameId[] = [
    { name: "collection center", id: 1 },
    { name: "transporter", id: 4 },
    { name: "merchant", id: 5 },
  ]
  isDisabled: boolean=false;

  constructor(private corpsvc: CorporateService, private memsvc: MembershipService,
    private merchantsvc: MerchantService, private transervice: TransporterService, 
    private collectioncentersvc: CollectioncenterService,private route: ActivatedRoute, private router: Router) { }


  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      console.log(params)
      this.personId = params.get('id');
    });
  }

  AddUser(corporateId: number) {
    if (this.userRole.roleId != 0 && this.personId != null) {
      this.userRole.userId = this.personId;
      this.memsvc.AddUserWithRole(this.userRole).subscribe((response) => {
        console.log("🚀 ~ this.svc.AddUserWithRole ~ response:", response);
        if (response == true) {
          switch (this.userRole.roleId) {
            case 1:
              const collectionCenter: Collectioncenter = {
                corporateId: corporateId,
                inspectorId: this.userRole.userId
              }
              this.collectioncentersvc.addCollectioncenter(collectionCenter).subscribe((r) => {
                console.log(r);
                this.router.navigate(['/auth/login'])
              });
              break;
            case 4:
              const transporter: Transporter = {
                corporateId: corporateId,
                managerId: this.userRole.userId
              }
              this.transervice.addTransporter(transporter).subscribe((r) => {
                console.log(r);
                this.router.navigate(['/auth/login'])
              });
              break;
            case 5:
              const merchant: Merchant = {
                corporateId: corporateId,
                managerId: this.userRole.userId
              }
              this.merchantsvc.addMerchant(merchant).subscribe((r) => {
                console.log(r);
                this.router.navigate(['/auth/login'])
              });
              break;
          }

          console.log(" user with role added successfully");
        }
        else
          console.log("error while registering")
      });
    }
  }



  onClickAdd() {
    this.isDisabled=true;
    var obj = {
      "name": this.corporation.name,
      "contactNumber": this.corporation.contactNumber,
      "email": this.corporation.email,
      "personId": this.personId,
    }
    this.corpsvc.addCorporate(obj).subscribe((res) => {
      if (res) {
        this.corpsvc.getCorporateIdByPersonId(this.personId).subscribe((corpId) => {
          this.AddUser(corpId);
        });
      }
    });
  }
}
