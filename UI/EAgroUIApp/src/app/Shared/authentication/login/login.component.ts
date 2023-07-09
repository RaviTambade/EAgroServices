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

  constructor(private svc: AuthService , private router:Router) { }

  onLogin(form: any) {
    console.log(form);
    this.svc.validate(form).subscribe((response) => {
      console.log(response);
      if (response.token != null) {
        localStorage.setItem("jwt", response.token)
        alert("Login sucessfull")
        this.router.navigate(['/membership/user/register/',this.credential.contactNumber])
      }
    })
  }
}
