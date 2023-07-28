import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Credential } from '../credential';
import { Router } from '@angular/router';
import { UserService } from '../../users/user.service';
import { UserRoleService } from 'src/app/user-role.service';
import { MerchantService } from 'src/app/merchant/merchant.service';
import { TransporterService } from 'src/app/transporter/transporter.service';
import { CollectioncenterService } from 'src/app/collectioncenter.service';

@Component({
  selector: 'auth-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {


  credential: Credential = {
    contactNumber: '',
    password: ''
  }
  userId: number | undefined;
  roles: string[] = [];

  constructor(private svc: AuthService, private router: Router,private usersvc:UserService,
    private userrolesvc:UserRoleService,private merchantsvc:MerchantService,
    private tarnsportsvc:TransporterService, private collectioncentersvc:CollectioncenterService) { }

  onLogin(form: any) {
    console.log(form);
    this.svc.validate(form).subscribe((response) => {
      console.log(response);
      if (response.token != null) {
        localStorage.setItem("jwt", response.token)
        alert("Login sucessfull")

        this.usersvc.getUserIdByContact(this.credential.contactNumber).subscribe((responseId) => {
          this.userId = responseId;
          localStorage.setItem("userId",this.userId.toString())
          console.log("🚀 ~ this.svc.getUserIdByContact ~ userId:", this.userId);

          this.userrolesvc.getRolesOfUser(responseId).subscribe((responseRoles) => {
            console.log("func")
            this.roles = responseRoles;
            console.log("🚀 ~ this.svc.getRolesOfUser ~ roles:", this.roles);



            if (this.roles?.length == 1) {
              const role = this.roles[0];
              this.navigateByRole(role);
            }

            if (this.roles?.length < 1) {
              this.router.navigate(['/membership/user/register/', this.credential.contactNumber])
            }
          });
        });
      }
    });
  }

  navigateByRole(role: string) {
    localStorage.setItem("role",role);
    switch (role) {
      case "farmer":
        this.router.navigate(['/farmer/home/', this.userId])
        break;

      case "merchant":
        if (this.userId != undefined)
          this.merchantsvc.getmerchantIdByUserId(this.userId).subscribe((merchantId) => {
            localStorage.setItem("merchantId", merchantId.toString());
            this.router.navigate(['/merchant/home'])
          });
        break;

      case "transporter":
        if (this.userId != undefined)
        this.tarnsportsvc.gettransporterIdByUserId(this.userId).subscribe((transporterId) => {
          localStorage.setItem("transporterId",transporterId.toString());
          this.router.navigate(['/transporter', transporterId ,'vehicles'])
        });
        
        break;

      case "owner":
        if (this.userId != undefined)
        this.collectioncentersvc.getCollectionCenterId(this.userId).subscribe((transporterId) => {
          localStorage.setItem("collectionCenterId",transporterId.toString());
          this.router.navigate(['/collectioncenter/home'])
        });
        break;

      case "inspector":
        if (this.userId != undefined)
        this.collectioncentersvc.getCollectionCenterId(this.userId).subscribe((transporterId) => {
          localStorage.setItem("collectionCenterId",transporterId.toString());
          this.router.navigate(['/collectioncenter/home'])
        });
        break;
    }
  }

  newAccountStatus() {
    return this.roles.length < 1;
  }


}
