import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { User } from 'src/app/Models/user';
import { Admin } from 'src/app/Models/admin';
import { Farmer } from 'src/app/Models/farmer';
import { Employee } from 'src/app/Models/employee';
import { Transport } from 'src/app/Models/transport';
import { Merchant } from 'src/app/Models/merchant';
import { Userrole } from 'src/app/Models/userrole';
import { Role } from 'src/app/Models/role';
import { Useradminrole } from 'src/app/Models/useradminrole';
import { Userfarmerrole } from 'src/app/Models/userfarmerrole';
import { Useremployeerole } from 'src/app/Models/useremployeerole';
import { Usermerchantrole } from 'src/app/Models/usermerchantrole';
import { AuthService } from 'src/app/Services/auth.service';
import { Usertransportrole } from 'src/app/Models/usertransportrole';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export default class RegisterComponent {
  user: User = {
    contactNumber: '',
    password: ''
  };
  admin: Admin = {
    firstName: '',
    lastName: '',
    location: ''
  };
  farmer: Farmer = {
    firstName: '',
    lastName: '',
    location: '',
    farmerId: 0
  };
  employee: Employee = {
    firstName: '',
    lastName: '',
    location: '',
    salary: 0
  };
  transport: Transport = {
    officeName: '',
    firstName: '',
    lastName: '',
    location: '',
    transportId: 0
  };
  merchant: Merchant = {
    merchantId:0,
    firstName: '',
    lastName: '',
    companyName: '',
    location: ''
  };

  userRole: Userrole = {
    roleId: 0
  };

  roles:Role[] = [];
    
  selectedRole: string | any;

  insertAdmin: Useradminrole = {
    user: undefined,
    admin: undefined,
    userRole: undefined
  };
  insertFarmer: Userfarmerrole = {
    user: undefined,
    farmer: undefined,
    userRole: undefined
  };
  insertEmployee: Useremployeerole = {
    user: undefined,
    employee: undefined,
    userRole: undefined
  };
  insertTransport: Usertransportrole = {
    user: undefined,
    transport: undefined,
    userRole: undefined
  };
  insertMerchant: Usermerchantrole = {
    user: undefined,
    merchant: undefined,
    userRole: undefined
  };

  constructor(private svc: AuthService) { }
  ngOnInit(): void {
    this.svc.getRoles().subscribe((response)=>{
      this.roles=response;
      console.log(response);
    })
  }

  onSubmit() {
    console.log(this.selectedRole);
    switch (this.selectedRole) {
      case '1': {
        this.userRole = { roleId: this.selectedRole };
        this.insertAdmin = {
          user: this.user,
          admin: this.admin,
          userRole: this.userRole
        };
        console.log("insert admin :" , this.insertAdmin);
        this.svc.registerAdmin(this.insertAdmin).subscribe((response) => {
          console.log(response);
          if (response) {
            alert("register sucessfull")
            // window.location.reload();
          }
          else {
            alert("register Failed")
          }

        })
      }
        break;
      case '2': {
        this.userRole = { roleId: this.selectedRole };
        this.insertFarmer = {
          user: this.user,
          farmer: this.farmer,
          userRole: this.userRole
        };
        console.log("insert farmer :" + this.insertFarmer);
        this.svc.registerFarmer(this.insertFarmer).subscribe((response) => {
          console.log(response);
          if (response) {
            alert("register sucessfull")
            // window.location.reload();
          }
          else {
            alert("register Failed")
          }

        })
      }
        break;
      case '3': {
        this.userRole = { roleId: this.selectedRole };
        this.insertEmployee = {
          user: this.user,
          employee: this.employee,
          userRole: this.userRole
        };
        console.log("insert employee :" , this.insertEmployee);
        this.svc.registerEmployee(this.insertEmployee).subscribe((response) => {
          console.log(response);
          if (response) {
            alert("register sucessfull")
            // window.location.reload();
          }
          else {
            alert("register Failed")
          }

        })
      }
        break;
      case '4': {
        this.userRole = { roleId: this.selectedRole };
        this.insertTransport = {
          user: this.user,
          transport: this.transport,
          userRole: this.userRole
        };
        console.log("insert transport :" + this.insertTransport);
        this.svc.registerTransport(this.insertTransport).subscribe((response) => {
          console.log(response);
          if (response) {
            alert("register sucessfull")
            // window.location.reload();
          }
          else {
            alert("register Failed")
          }

        })
      }
        break;
      case '5': {
        this.userRole = { roleId: this.selectedRole };
        this.insertMerchant = {
          user: this.user,
          merchant: this.merchant,
          userRole: this.userRole
        };
        console.log("insert merchant :" + this.insertMerchant);
        this.svc.registerMerchant(this.insertMerchant).subscribe((response) => {
          console.log(response);
          if (response) {
            alert("register sucessfull")
            // window.location.reload();
          }
          else {
            alert("register Failed")
          }

        })
      }
        break;
    }
  }
}