import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserDetails } from 'src/app/Models/user-details';
import { UserRole } from 'src/app/Models/user-role';
import { MembershipService } from 'src/app/Services/membership.service';

@Component({
  selector: 'app-registeruser',
  templateUrl: './registeruser.component.html',
  styleUrls: ['./registeruser.component.css']
})
export class RegisteruserComponent implements OnInit {

  contactNumber: string | any;
  userDetails: UserDetails | undefined;
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
        this.userDetails = response;
      });
    }
  }

  onClickUserRoleFarmer() {
    this.setRoleAndUserId(2);
    this.callAddUser();
  }

  setRoleAndUserId(roleId: number) {
    this.userRole.roleId = roleId;
    if (this.userDetails?.id !== undefined) {
      this.userRole.userId = this.userDetails.id;
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
    this.router.navigate(['/membership/corporate/register/',this.userDetails?.id])
  }
}

