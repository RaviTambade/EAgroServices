import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Credential } from '../credential';
import { Router } from '@angular/router';
import { UserService } from '../../users/user.service';
import { CollectioncenterService } from 'src/app/Services/collectioncenter.service';
import { MerchantService } from 'src/app/Services/merchant.service';
import { TransporterService } from 'src/app/Services/transporter.service';
import { UserRoleService } from 'src/app/Services/user-role.service';
import { LocalStorageKeys } from 'src/app/Models/Enums/local-storage-keys';


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

  constructor(
    private authsvc: AuthService,
    private router: Router,
    private merchantsvc: MerchantService,
    private tarnsportsvc: TransporterService,
    private collectioncentersvc: CollectioncenterService) { }

  onLogin(form: any) {
    console.log(form);
    this.authsvc.validate(form).subscribe((response) => {
      console.log(response);
      if (response.token != null) {
        localStorage.setItem(LocalStorageKeys.jwt, response.token)
        alert("Login successfull")

        this.roles = this.authsvc.getRolesFromToken();
        if (this.roles?.length == 1) {
          const role = this.roles[0];
          this.navigateByRole(role);
        }

        if (this.roles?.length < 1) {
          this.router.navigate(['/membership/user/register/', this.credential.contactNumber])
        }
      }
    });
  }

  navigateByRole(role: string) {
    localStorage.setItem("role", role);
    switch (role) {
      case "farmer":
        if (this.userId != undefined)
          localStorage.setItem("farmerId", this.userId.toString());
        this.router.navigate(['/farmer/home'])
        break;

      case "merchant":
        if (this.userId != undefined)

          this.merchantsvc.getmerchantIdByUserId(this.userId).subscribe((merchantId) => {
            console.log(this.userId);
            console.log(merchantId);
            localStorage.setItem("merchantId", merchantId.toString());
            this.router.navigate(['/merchant/dashboard'])
          });
        break;

      case "transporter":
        if (this.userId != undefined)
          this.tarnsportsvc.gettransporterIdByUserId(this.userId).subscribe((transporterId) => {
            localStorage.setItem("transporterId", transporterId.toString());
            this.router.navigate(['/transporter/vehicles'])
          });

        break;

      case "collection manager":
        if (this.userId != undefined)
          this.collectioncentersvc.getCollectionCenterId(this.userId).subscribe((collectionCenterId) => {
            localStorage.setItem("collectionCenterId", collectionCenterId.toString());
            this.router.navigate(['/collectioncenter/dashboard'])
          });
        break;

      case "inspector":
        if (this.userId != undefined)
          this.collectioncentersvc.getCollectionCenterId(this.userId).subscribe((collectionCenterId) => {
            localStorage.setItem("collectionCenterId", collectionCenterId.toString());
            this.router.navigate(['/collectioncenter/dashboard'])
          });
        break;
    }
  }

  newAccountStatus() {
    return this.roles.length < 1;
  }


}
