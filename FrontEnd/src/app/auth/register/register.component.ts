import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/spa/auth.service';
import { Role } from 'src/app/vendors/role';
import { User } from 'src/app/vendors/user';
import { Userrole } from 'src/app/vendors/userrole';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user: User = {
    id: 0,
    firstName: '',
    lastName: '',
    contactNumber: '',
    aadharId: '',
    imageUrl: '',
    password: ''
  };

  userRole: Userrole = {
    roleId: 0
  }

  roles: Role[] = [];

  constructor(private svc: AuthService) { }
  ngOnInit(): void {
    this.svc.getRoles().subscribe((response) => {
      this.roles = response;
    })
  }



  onSubmit() {
    this.svc.register(this.user,this.userRole).subscribe((response) => {
      console.log(response)
    })
    }
  }

