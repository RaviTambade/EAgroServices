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
  user: User |any;
  // authResponse : Authresponse |any;
  constructor(private svc :AuthService){}
  ngOnInit(): void {}

  logIn(){
    this.svc.logIn(this.user).subscribe((response)=>{
      //  response=this.authResponse.token;
      console.log(response);
      console.log(this.user);
      if(response)
      {
        alert("login successfully")
      }
      else{
        alert("user doesn't exist")
      }

    })  
}
}
