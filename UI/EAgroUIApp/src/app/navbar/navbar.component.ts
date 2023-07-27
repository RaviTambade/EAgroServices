import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(private router:Router){}

  isroleInspector():boolean{
  const role=  localStorage.getItem("role")
    return role == 'inspector';
  }

  isroleTransporter():boolean{
    const role=  localStorage.getItem("role")
      return role == 'transporter';
    }

    isroleMerchant():boolean{
      const role=  localStorage.getItem("role")
        return role == 'merchant';
      }

      openUserProfile(){
this.router.navigate(['userinfo']);
      }

}
