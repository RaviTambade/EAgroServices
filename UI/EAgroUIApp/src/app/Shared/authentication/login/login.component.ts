import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Credential } from '../credential';
import { Router } from '@angular/router';

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

  constructor(private svc: AuthService, private router: Router) { }

  onLogin(form: any) {
    console.log(form);
    this.svc.validate(form).subscribe((response) => {
      console.log(response);
      if (response.token != null) {
        localStorage.setItem("jwt", response.token)
        alert("Login sucessfull")

        this.svc.getUserIdByContact(this.credential.contactNumber).subscribe((responseId) => {
          this.userId = responseId;
          console.log("🚀 ~ this.svc.getUserIdByContact ~ userId:", this.userId);

          this.svc.getRolesOfUser(responseId).subscribe((responseRoles) => {
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
    switch (role) {
      case "farmer":
        this.router.navigate(['/farmer/home/', this.userId])
        break;

      case "merchant":
        if (this.userId != undefined)
          this.svc.getmerchantIdByUserId(this.userId).subscribe((merchantId) => {
            localStorage.setItem("merchantId", merchantId.toString());
            this.router.navigate(['/merchant/home'])
          });
        break;

      case "transporter":
        if (this.userId != undefined)
        this.svc.gettransporterIdByUserId(this.userId).subscribe((transporterId) => {
          localStorage.setItem("transporterId",transporterId.toString());
          this.router.navigate(['/transporter', transporterId ,'vehicles'])
        });
        
        break;

      case "owner":
        this.router.navigate(['/collectioncenter/home/', this.userId])
        break;

      case "inspector":
        this.router.navigate(['/inspector/home/', this.userId])
        break;
    }
  }

  newAccountStatus() {
    return this.roles.length < 1;
  }


}
