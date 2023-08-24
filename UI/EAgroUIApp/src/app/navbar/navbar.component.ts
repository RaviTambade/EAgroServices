import { Component } from '@angular/core';
import {  Router } from '@angular/router';
import { AuthService } from '../Shared/authentication/auth.service';
import { Role } from '../Models/Enums/role';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  
  constructor(private router: Router, private authsvc: AuthService) { }

  isroleCollectionManager(): boolean {
    const roles = this.authsvc.getRolesFromToken()
    return roles.includes(Role.collectionmanager)
  }
  isroleInspector(): boolean {
    const roles = this.authsvc.getRolesFromToken()
    return roles.includes(Role.inspector)
  }

  isroleTransporter(): boolean {
    const roles = this.authsvc.getRolesFromToken()
    return roles.includes(Role.transporter)
  }

  isroleMerchant(): boolean {
    const roles = this.authsvc.getRolesFromToken()
    return roles.includes(Role.merchant)
  }
  isroleFarmer(): boolean {
    const roles = this.authsvc.getRolesFromToken()
    return roles.includes(Role.farmer)
  }

  openUserProfile() {
    this.router.navigate(['userinfo']);
  }

  isLoggedIn(): boolean {
    return this.authsvc.isAuthenticated();
  }

  loggedOut() {
    const result=window.confirm("Are you sure you want to log out?");
    if(result){
      this.router.navigate(["auth/login"])
      localStorage.clear();
    }
    else{
      console.log("logout canceled");
    }
  }
}
