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

  isRoleCollectionManager(): boolean {
    return this.authsvc.isTokenHaveRequiredRole(Role.collectionmanager) && this.isLoggedIn();
  }
  isRoleInspector(): boolean {
    return this.authsvc.isTokenHaveRequiredRole(Role.inspector)  && this.isLoggedIn() ;
  }

  isRoleTransporter(): boolean {
    return this.authsvc.isTokenHaveRequiredRole(Role.transporter)  && this.isLoggedIn();
  }

  isRoleMerchant(): boolean {
    return this.authsvc.isTokenHaveRequiredRole(Role.merchant)  && this.isLoggedIn();
  }
  isRoleFarmer(): boolean {
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
