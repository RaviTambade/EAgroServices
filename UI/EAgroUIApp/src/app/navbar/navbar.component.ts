import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(private router: Router) { }

  isroleInspector(): boolean {
    const role = localStorage.getItem("role")
    return role == 'inspector' || role =='collection manager';
  }

  isroleTransporter(): boolean {
    const role = localStorage.getItem("role")
    return role == 'transporter' ;
  }

  isroleMerchant(): boolean {
    const role = localStorage.getItem("role")
    return role == 'merchant';
  }
  isroleFarmer(): boolean {
    const role = localStorage.getItem("role")
    return role == 'farmer';
  }

  openUserProfile() {
    this.router.navigate(['userinfo']);
}

isUser():boolean{
  const userId = localStorage.getItem("userId")
  if (userId != null) {
    return true;
  }
  return false;
}

isLoggedIn():boolean{
  const jwt =localStorage.getItem("jwt")
  if (jwt != null) {
    return false;
  }
  return true;
}
loggedOut(){
  this.router.navigate(['userlogout']);
}
}
