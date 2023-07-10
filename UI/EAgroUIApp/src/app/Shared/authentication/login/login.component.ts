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
          const id = responseId;
          console.log("🚀 ~ this.svc.getUserIdByContact ~ userId:", this.userId);

          // if (this.userId != undefined)
          this.svc.getRolesOfUser(responseId).subscribe((responseRoles) => {
            console.log("func")
            this.roles = responseRoles;
            console.log("🚀 ~ this.svc.getRolesOfUser ~ roles:", this.roles);
            if (this.roles?.length < 1){
              this.router.navigate(['/membership/user/register/', this.credential.contactNumber])
            }
            this.navigateByRole("role")

          });


        });


      }
    });
  }

  navigateByRole(role:string){

  }

  newAccountStatus(){
    return this.roles.length<1;
  }

  
}
