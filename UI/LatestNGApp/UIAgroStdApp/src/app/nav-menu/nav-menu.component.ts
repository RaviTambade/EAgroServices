import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../Services/user.service';
import { AuthenticationService } from '../Services/authentication.service';
import { CorporateService } from '../Services/corporate.service';
import { NameId } from '../Models/name-id';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit {
  isExpanded = false;
  name: string | undefined
  corporateName:string='';
  userId: number | undefined;
  roles: string[]=[];

  constructor(private router: Router, private userService: UserService,private authService:AuthenticationService,private corporateService:CorporateService) { }
  ngOnInit(): void {
     let contactNumber =  this.authService.getContactNumberFromToken()
    if (contactNumber != null) {
      this.userService.getUserByContact(contactNumber).subscribe((response) => {
        console.log(response);
        this.name = response.name;
      })    
    }
    this.getRole();
  }

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }
  isLoggedIn(): boolean {
    let jwt = localStorage.getItem("JWT")
    return jwt != null;
  }

  getUserName() {
    let contactNumber =  this.authService.getContactNumberFromToken()
    if (contactNumber != null) {
      this.userService.getUserByContact(contactNumber).subscribe((response) => {
        console.log(response);
        this.name = response.name;
      })    
    }

  }
getCorporate(){
  this.corporateService.getCorporateIdByPersonId().subscribe((corporateId)=>{
    this.corporateService.getCorporates(corporateId).subscribe((response)=>{
      this.corporateName=response[0].name
    })
  })
}

getRole(){
this.userId= Number(localStorage.getItem("userId"));
this.userService.getUserRole(this.userId).subscribe((res)=>{
  this.roles=res
});
}

isCorporate():boolean{
    return this.roles.includes("collection manager"||"merchant"||"transporter")
}


  logOut() {
    localStorage.clear();
    this.router.navigate(['login']);
  }

  
  openUserProfile() {
    this.router.navigate(['user/userinfo']);
  }

}