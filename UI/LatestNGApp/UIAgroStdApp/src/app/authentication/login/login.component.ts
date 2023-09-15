import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import { Credential } from 'src/app/Models/credential';
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
    password: ''
  }
  userId: number | undefined;
  roles: string[] = [];

  constructor(private router: Router, private authService: AuthenticationService, private userService: UserService) { }

  public onSignIn() {
    console.log("Validating user");
    this.authService.validate(this.credential).subscribe((response) => {
      if (response != null) {
        localStorage.setItem("JWT", response.token)
        this.userService.getUserByContact(this.credential.contactNumber).subscribe((response) => {
          this.userId = response.id;
          console.log(this.userId);
          localStorage.setItem("userId",this.userId.toString());
          this.userService.getUserRole(this.userId).subscribe((response) => {
            this.roles = response;
            console.log(this.roles);
            const role=this.roles[0]
            this.navigateByRole(role)
          })
        })
      }

    })


  }

  navigateByRole(role: string) {
    switch (role) {
      case "farmer":
        this.router.navigate(["farmer/dashboard"])
        break;
      case "collection manager":
        this.router.navigate(["collectionmanager/dashboard"])
        break;
      case "merchant":
        this.router.navigate(["merchant/dashboard"])
        break;
      case "transporter":
        this.router.navigate(["transporter/dashboard"])
        break;
    }











  }

}

