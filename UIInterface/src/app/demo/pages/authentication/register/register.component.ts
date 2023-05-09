import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../auth.service';
import { Userfarmerrole } from '../userfarmerrole';
import { Userrole } from '../userrole';
import { Farmer } from '../farmer';
import { User } from '../user';
import { FormsModule } from '@angular/forms';
import { Merchant } from '../merchant';
import { Usermerchantrole } from '../usermerchantrole';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, RouterModule,FormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export default class RegisterComponent {
  user: User ={
    contactNumber:'',
    password:''
  };
  farmer:Farmer ={
    firstName :'',
    lastName : '',
    location : ''
  };
  merchant:Merchant={
    firstName:'',
    lastName:'',
    companyName:'',
    location:''
  };
  userRole:Userrole={
    roleId:0
  };
  
  rolename =[{
    role:"Admin",value:"admin"
  },
  {
    role:"Farmer",value:"farmer"
  },
  {
    role:"Employee",value:"employee"
  },
  {
    role:"Transport",value:"transport"
  },
  {
    role:"Merchant",value:"merchant"
  }
];
selectedRole:string |any;

insertFarmer: Userfarmerrole ={
  user:{
    contactNumber:'',
    password:''
  },
  farmer:{
  firstName :'',
  lastName : '',
  location : ''
},
userRole:{
  roleId:0
}};
insertMerchant: Usermerchantrole ={
  user:{
    contactNumber:'',
    password:''
  },
  merchant:{
    firstName:'',
    lastName:'',
    companyName:'',
    location:''
  },
userRole:{
  roleId:0
}};
  constructor(private svc :AuthService){}
  ngOnInit(): void {
  
  }

onSubmit(){
  switch(this.selectedRole){
    case 'farmer':{
      this.userRole = { roleId: 2 };
      this.insertFarmer = {
        user: this.user,
        farmer: this.farmer,
        userRole: this.userRole
      };
      console.log("insert farmer :" + this.insertFarmer);
      this.svc.registerFarmer(this.insertFarmer).subscribe((response)=>{
        console.log(response);
        if(response){
          alert("register sucessfull")
          // window.location.reload();
        }
        else
        {
          alert("register Failed")
        }
        
      })
    }
    break;
    case 'merchant':{
      this.userRole = { roleId: 5 };
      this.insertMerchant = {
        user: this.user,
        merchant: this.merchant,
        userRole: this.userRole
      };
      console.log("insert merchant :" + this.insertMerchant);
      this.svc.registerMerchant(this.insertMerchant).subscribe((response)=>{
        console.log(response);
        if(response){
          alert("register sucessfull")
          // window.location.reload();
        }
        else
        {
          alert("register Failed")
        }
        
      })
    } 
      break;

        default:
          break;
      }
  }
}
