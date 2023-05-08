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
<<<<<<< HEAD
export default class LoginComponent implements OnInit {
  inValidLogin:boolean ;
 @Input() user: User= {
   contactNumber: '', password: '',
   
 };
=======
export default class LoginComponent {
  user: User |any;
  authResponse:Authresponse |any;
>>>>>>> f4996273d71d15ed48fdfb5f5611d4ea58c9f579
  constructor(private svc :AuthService){}
  ngOnInit(): void {}

  logIn(){
<<<<<<< HEAD
    this.svc.logIn(this.user).subscribe(response=>{
      // this.user.token=response.token;
      // localStorage.setItem('jwt',this.user.token);
      this.inValidLogin=false;
    },
    (err)=>{
      err.this.inValidLogin=true;
    })
=======
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
>>>>>>> f4996273d71d15ed48fdfb5f5611d4ea58c9f579
  }
}
