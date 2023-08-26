import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../Shared/authentication/auth.service';
import { Role } from '../Models/Enums/role';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  constructor(private router: Router, private authsvc: AuthService) {}

  isroleCollectionManager(): boolean {
    return this.authsvc.isTokenHaveRequiredRole(Role.collectionmanager) && this.isLoggedIn();
  }
  isroleInspector(): boolean {
    return this.authsvc.isTokenHaveRequiredRole(Role.inspector)  && this.isLoggedIn() ;
  }

  isroleTransporter(): boolean {
    return this.authsvc.isTokenHaveRequiredRole(Role.transporter)  && this.isLoggedIn();
  }

  isroleMerchant(): boolean {
    return this.authsvc.isTokenHaveRequiredRole(Role.merchant)  && this.isLoggedIn();
  }
  isroleFarmer(): boolean {
    return this.authsvc.isTokenHaveRequiredRole(Role.farmer)  && this.isLoggedIn();
  }

  openUserProfile() {
    this.router.navigate(['user/userinfo']);
  }

  isLoggedIn(): boolean {
    return this.authsvc.isAuthenticated();
  }

  loggedOut() {
    const result = window.confirm('Are you sure you want to log out?');
    if (result) {
      this.router.navigate(['auth/login']);
      localStorage.clear();
    } else {
      console.log('logout canceled');
    }
  }
}
