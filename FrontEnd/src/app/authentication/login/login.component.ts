import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Credential } from '../credential';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

 
  credential:Credential={
    contactNumber: '',
    password: ''
  }
  
  constructor(private svc:AuthService){}

  onLogin(form:any){
    console.log(form);
    this.svc.validate(form).subscribe((response)=>{
          console.log(response);
          
          if(response){
            alert("Login sucessfull")
            window.location.reload();
          }
          else
          {
            alert("Login Failed")
          }
        })
  }
}
