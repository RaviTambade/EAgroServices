import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Farmer } from '../farmer';
import { Merchant } from '../merchant';
import { Role } from '../role';
import { User } from '../user';

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
selectedRole:string |undefined;

  constructor(private svc :AuthService){}
  ngOnInit(): void {
  
  }

onSubmit(form:any){
  switch(this.selectedRole){
    case 'farmer':
      this.svc.registerFarmer(form).subscribe((response)=>{
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

      case 'merchant':
        this.svc.registerMerchant(form).subscribe((response)=>{
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
}
}