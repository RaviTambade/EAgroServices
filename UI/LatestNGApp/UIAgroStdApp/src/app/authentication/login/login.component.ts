import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Credential } from 'src/app/Models/credential';
import { LocalStorageKeys } from 'src/app/Models/Enum/local-storage-keys';
import { Role } from 'src/app/Models/Enum/role';
import { AuthenticationService } from 'src/app/Services/authentication.service';
import { UserService } from 'src/app/Services/user.service';
@Component({
  selector: 'app-login-component',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  public currentCount = 0;
  credential: Credential = {
    contactNumber: '',
    password: '',
    lob:'EAgro'
  }
  isLoginButtonDisabled: boolean = false;
  isCredentialInvalid: boolean = false;
  userId!: number;
  roles: string[] = [];


  constructor(private router: Router, private authService: AuthenticationService, private userService: UserService) { }


  onSignIn() {
    this.isLoginButtonDisabled = true;
    this.authService.signIn(this.credential).subscribe({
      next: (response) => {
        if (response.token == "" || !response) {
          this.isCredentialInvalid = true;
          setTimeout(() => {
            this.isCredentialInvalid = false;
          }, 3000);
        }

        if (response.token != "") {
          localStorage.setItem(LocalStorageKeys.jwt, response.token);
          this.roles = this.authService.getRolesFromToken();
          console.log("🚀 ~ this.authService.signIn ~ roles:", this.roles);
          if (this.roles?.length == 1) {
            const role = this.roles[0];
            this.navigateByRole(role);
          }
        }
      },

      error: (error) => {
        console.error(error);
      },
      complete: () => {
        this.isLoginButtonDisabled = false;
      },
    });
  }


  navigateByRole(role: string) {
    switch (role) {
      case Role.farmer:
        this.router.navigate(["farmer/dashboard"])
        break;
      case Role.collectionmanager:
        this.router.navigate(["collectionmanager/dashboard"])
        break;
      case Role.merchant:
        this.router.navigate(["merchant/dashboard"])
        break;
      case Role.transporter:
        this.router.navigate(["transporter/dashboard"])
        break;
    }











  }

}

