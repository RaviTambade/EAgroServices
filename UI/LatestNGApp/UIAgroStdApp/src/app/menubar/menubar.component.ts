import { Component, OnInit } from '@angular/core';
import { UserService } from '../Services/user.service';

@Component({
  selector: 'app-menubar',
  templateUrl: './menubar.component.html',
  styleUrls: ['./menubar.component.css']
})
export class MenubarComponent implements OnInit {
  roles: string[]=[];
  userId: number | undefined;

  constructor( private usersvc: UserService) {}
  ngOnInit(): void {
   this.userId= Number(localStorage.getItem("userId"));
    this.usersvc.getUserRole(this.userId).subscribe((res)=>{
      this.roles=res;
      console.log(this.roles);
  });
}
  isRoleCollectionManager():boolean{
    return this.roles.includes("collection manager")
}
  
  isRoleInspector(): boolean {
    return this.roles.includes("inspector")
  }

  isRoleTransporter(): boolean {
    return this.roles.includes("transporter")
  }

  isRoleMerchant(): boolean {
    return this.roles.includes("merchant")   
  }
  isRoleFarmer(): boolean {
    return this.roles.includes("farmer")
  }
  }




