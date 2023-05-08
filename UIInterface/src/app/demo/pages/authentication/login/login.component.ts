import { Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../auth.service';
import { User } from '../user';
import { Authresponse } from '../authresponse';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule,FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export default class LoginComponent {
  user: User |any;
  authResponse:Authresponse |any;
  constructor(private svc :AuthService){}
  ngOnInit(): void {}

  logIn(){
    this.svc.logIn(this.user).subscribe((response)=>{
       response=this.authResponse.token;
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
