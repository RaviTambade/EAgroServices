import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Credential } from '../credential';
import { Router } from '@angular/router';
import { CollectioncenterService } from 'src/app/Services/collectioncenter.service';
import { MerchantService } from 'src/app/Services/merchant.service';
import { TransporterService } from 'src/app/Services/transporter.service';
import { LocalStorageKeys } from 'src/app/Models/Enums/local-storage-keys';
import { Role } from 'src/app/Models/Enums/role';


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
  roles: string[] = [];

  showPassword: boolean = false;



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
      if (response == null) {
        alert("Invalid credentials");
        return;
      }

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
    console.log(role)
    const userId = this.authsvc.getUserIdFromToken();
    if (!userId) {
      window.location.reload();
      return;
    }
    console.log(userId)
    switch (role) {
      case Role.farmer:
        localStorage.setItem(LocalStorageKeys.farmerId, userId.toString());
        this.router.navigate(['/farmer/home'])
        break;

      case Role.merchant:
        this.merchantsvc.getmerchantIdByUserId(userId).subscribe((merchantId) => {
          localStorage.setItem(LocalStorageKeys.merchantId, merchantId.toString());
          this.router.navigate(['/merchant/dashboard'])
        });
        break;

      case Role.transporter:
        this.tarnsportsvc.gettransporterIdByUserId(userId).subscribe((transporterId) => {
          localStorage.setItem(LocalStorageKeys.transporterId, transporterId.toString());
          this.router.navigate(['/transporter/vehicles'])
        });

        break;

      case Role.collectionmanager:
        this.collectioncentersvc.getCollectionCenterId(userId).subscribe((collectionCenterId) => {
          localStorage.setItem(LocalStorageKeys.collectionCenterId, collectionCenterId.toString());
          this.router.navigate(['/collectioncenter/dashboard'])
        });
        break;

      case Role.inspector:
        this.collectioncentersvc.getCollectionCenterId(userId).subscribe((collectionCenterId) => {
          localStorage.setItem(LocalStorageKeys.collectionCenterId, collectionCenterId.toString());
          this.router.navigate(['/collectioncenter/dashboard'])
        });
        break;
    }
  }

  showLoginPage() {
    return this.roles.length < 1;
  }
  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

}
