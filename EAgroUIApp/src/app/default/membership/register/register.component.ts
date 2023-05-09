import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Farmer } from '../farmer';
import { Insertfarmerrequest } from '../insertfarmerrequest';
import { Merchant } from '../merchant';
import { Role } from '../role';
import { User } from '../user';
import { Userrole } from '../userrole';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  user: User ={
    contactNumber:'',
    password:''
  };
  farmer:Farmer ={
    firstName :'',
    lastName : '',
    location : ''
  };
  merchant:Merchant ={
    firstName :'',
    lastName : '',
    location : '',
    companyName: ''
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
    role:"Merchant",value:"merchant"
  },
];
selectedRole:string |any;
insertFarmer: Insertfarmerrequest ={
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
      // case 'merchant':
      //   this.svc.registerMerchant(this.insertFarmer).subscribe((response)=>{
      //     console.log(response);
      //     if(response){
      //       alert("register sucessfull")
      //       // window.location.reload();
      //     }
      //     else
      //     {
      //       alert("register Failed")
      //     }
      //   })

        default:
          break;
      }
  }
}
