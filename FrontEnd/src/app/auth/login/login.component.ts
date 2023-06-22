import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  // user: User = {
  //   contactNumber: '',
  //   password: ''
  // };

  // constructor(private svc: AuthService, private router: Router) { }

  // logIn() {
  //   console.log("login clicked")
  //   console.log(this.user)
  //   this.svc.logIn(this.user).subscribe((response) => {
  //     // // console.log(response);
  //     // if(response.status==400){
  //     //   console.log("invalid login")
  //     // }
  //     localStorage.setItem('jwtToken', response.token);
  //     const role = this.svc.getRoleFromToken();
  //     console.log(role)
  //     if (role == "farmer") {
  //       const farmerId = this.svc.getFarmerIdFromToken();
  //       console.log(farmerId);
  //       this.router.navigate(['farmers', farmerId,'dashboard']);
  //     } 
  //     if (role == "employee") {
  //       const employeeId = this.svc.getEmployeeIdFromToken();
  //       console.log(employeeId);
  //       this.router.navigate(['employees/dashboard', employeeId]);
  //     }
  //     if (role == "merchant") {
  //       const merchantId = this.svc.getMerchantIdFromToken();
  //       console.log(merchantId);
  //       this.router.navigate(['merchants/dashboard', merchantId]);
  //     }
  //     if (role == "transport") {
  //       const transportId = this.svc.getTransportIdFromToken();
  //       console.log(transportId);
  //       this.router.navigate(['transports/dashboard', transportId]);
  //     }
  //     if (role == "admin") {
  //       const adminId = this.svc.getAdminIdFromToken();
  //       console.log(adminId);
  //       this.router.navigate(['admin/dashboard', adminId]);
  //     }
     
  //   });
  // }
}
