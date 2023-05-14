import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { User } from '../user';
import { AuthService } from '../auth.service';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export default class LoginComponent {
  user: User = {
    contactNumber: '',
    password: ''
  };

  constructor(private svc: AuthService, private router: Router) { }

  logIn() {
    console.log("login clicked")
    console.log(this.user)
    this.svc.logIn(this.user).subscribe((response) => {
      // // console.log(response);
      // if(response.status==400){
      //   console.log("invalid login")
      // }
      localStorage.setItem('jwtToken', response.token);
      const role = this.getRoleFromToken();
      console.log(role)
      if (role == "farmer") {
        const farmerId = this.getFarmerIdFromToken();
        console.log(farmerId);
        this.router.navigate(['farmers/dashboard', farmerId]);
      } 
      if (role == "employee") {
        const employeeId = this.getEmployeeIdFromToken();
        console.log(employeeId);
        this.router.navigate(['employees', employeeId]);
      }
      if (role == "merchant") {
        const merchantId = this.getMerchantIdFromToken();
        console.log(merchantId);
        this.router.navigate(['merchants/dashboard', merchantId]);
      }
      if (role == "transport") {
        const transporttId = this.getTransportIdFromToken();
        console.log(transporttId);
        this.router.navigate(['transports', transporttId]);
      }
      if (role == "admin") {
        const adminId = this.getAdminIdFromToken();
        console.log(adminId);
        this.router.navigate(['default', adminId]);
      }
     
    });
  }
  getRoleFromToken(): string {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      const decodedToken: any = jwt_decode(token);
      return decodedToken.role;
    }
    return '';
  }
  getFarmerIdFromToken(): number {
    const token = localStorage.getItem('jwtToken');
    const decodedToken: any = jwt_decode(token);
    return decodedToken.farmerId;
  }
  getAdminIdFromToken(): number {
    const token = localStorage.getItem('jwtToken');
    const decodedToken: any = jwt_decode(token);
    return decodedToken.adminId;
  }
  getEmployeeIdFromToken(): number {
    const token = localStorage.getItem('jwtToken');
    const decodedToken: any = jwt_decode(token);
    return decodedToken.employeeId;
  }
  getMerchantIdFromToken(): number {
    const token = localStorage.getItem('jwtToken');
    const decodedToken: any = jwt_decode(token);
    return decodedToken.merchantId;
  }
  getTransportIdFromToken(): number {
    const token = localStorage.getItem('jwtToken');
    const decodedToken: any = jwt_decode(token);
    return decodedToken.transportId;
  }
}

