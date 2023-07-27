import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  isroleInspector():boolean{
  const role=  localStorage.getItem("role")
    return role == 'inspector';
  }

  isroleTransporter():boolean{
    const role=  localStorage.getItem("role")
      return role == 'transporter';
    }
  

}
