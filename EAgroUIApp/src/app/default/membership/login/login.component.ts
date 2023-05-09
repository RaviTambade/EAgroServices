import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Authresponse } from '../authresponse';
import { User } from '../user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  user: User ={
    contactNumber:'',
    password:''
  };

  constructor(private svc :AuthService){}
  ngOnInit(): void {
    console.log("login componenet called")
  }

onLogin(form:any){
  console.log(form);
  this.svc.logIn(form).subscribe((response)=>{
        console.log(response);
        console.log(response.token);
        
        if(response){
          alert("Login sucessfull")
          // window.location.reload();
        }
        else
        {
          alert("Login Failed")
        }
      })
}
}
