import { Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { User } from '../user';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule,FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export default class LoginComponent {



   user: User={
    contactNumber:'',
    password:''
   };
   
  // authResponse : Authresponse |any;
  constructor(private svc :AuthService){}

  logIn(){
    this.svc.logIn(this.user).subscribe((response)=>{
      console.log(response);
      if(response){
        alert("login successfully")
      }
      else{
        alert("user doesn't exist")
      }
    });
   
    console.log("auth service is called");
    console.log(this.user);
   console.log("log in ");
   
   }  
  }

