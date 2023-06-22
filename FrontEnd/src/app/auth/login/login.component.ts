import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/spa/auth.service';
import { User } from 'src/app/vendors/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  user: User |any;
  constructor(private svc: AuthService, private router: Router) { 
    this.user={
      contactNumber: '',
      password: ''
    }
  }

  logIn() {
    console.log("login clicked")
    console.log(this.user)
    this.svc.logIn(this.user).subscribe((response) => {
      // // console.log(response);
      // if(response.status==400){
      //   console.log("invalid login")
      // }
      localStorage.setItem('jwtToken', response.token);
      const role = this.svc.getRoleFromToken();
      console.log(role)
      if (role == "farmer") {
        const userId = this.svc.getUserIdFromToken();
        console.log(userId);
        // this.router.navigate(['home', userId]);
        window.location.reload();
      } 
      if (role == "employee") {
        const userId = this.svc.getUserIdFromToken();
        console.log(userId);
        // this.router.navigate(['home', userId]);
        window.location.reload();
      }
      if (role == "merchant") {
        const userId = this.svc.getUserIdFromToken();
        console.log(userId);
        // this.router.navigate(['home', userId]);
        window.location.reload();
      }
      if (role == "transport") {
        const userId = this.svc.getUserIdFromToken();
        console.log(userId);
        // this.router.navigate(['home', userId]);
        window.location.reload();
      }
      if (role == "admin") {
        const userId = this.svc.getUserIdFromToken();
        console.log(userId);
        // this.router.navigate(['home', userId]);
        window.location.reload();
      }    
    });
  }
}
