import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/Shared/authentication/auth.service';
import { Person } from '../person';
import { MembershipService } from '../membership.service';
import { UserRole } from '../user-role';

@Component({
  selector: 'app-registeruser',
  templateUrl: './registeruser.component.html',
  styleUrls: ['./registeruser.component.css']
})
export class RegisteruserComponent implements OnInit {

  contactNumber: string | any;
  person: Person | undefined;
  userRole: UserRole = {
    userId: 0,
    roleId: 0
  }

  constructor(private svc: MembershipService, private route: ActivatedRoute,private router:Router) { }

  ngOnInit(): void {

    this.route.paramMap.subscribe((params) => {
      console.log(params)
      this.contactNumber = params.get('id');
    });

    if (this.contactNumber != null) {
      this.svc.getUserByContact(this.contactNumber).subscribe((response) => {
        console.log(response);
        this.person = response;
      });
    }
  }

  onClickUserRoleFarmer() {
    this.setRoleAndUserId(2);
    this.callAddUser();
  }

  onClickUserRoleMerchant() {
    this.setRoleAndUserId(5);
    this.callAddUser();

  }

  onClickUserRoleTransporter() {
    this.setRoleAndUserId(4);
    this.callAddUser();

  }

  onClickUserRoleCollectionCenter() {
    this.setRoleAndUserId(1);
    this.callAddUser();

  }

  setRoleAndUserId(roleId: number) {
    this.userRole.roleId = roleId;
    if (this.person?.id !== undefined) {
      this.userRole.userId = this.person.id;
    }
  }

  callAddUser() {
    this.svc.AddUserWithRole(this.userRole).subscribe((response) => {
      console.log("🚀 ~ this.svc.AddUserWithRole ~ response:", response);
      if (response == true) {
        console.log(" user with role added successfully");
      }
      else
        console.log("error while registering")
    });
  }

  onClickAddCorporate(){
    this.router.navigate(['/membership/corporate/register/',this.person?.id])
  }
}

