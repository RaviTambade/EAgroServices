import { Component, Input, NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../app/auth.service';
import { FormsModule } from '@angular/forms';
import { NgModel} from '@angular/forms';
import { User } from '../app/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export default class LoginComponent implements OnInit {
  inValidLogin:boolean | undefined ;
 @Input() user: User= {
   contactNumber: '', password: '',
   
 };
  constructor(private svc :AuthService){}
  ngOnInit(): void {}

  logIn(){
    this.svc.logIn(this.user).subscribe(response=>{
      // this.user.token=response.token;
      // localStorage.setItem('jwt',this.user.token);
      this.inValidLogin=false;
    },
    (err)=>{
      err.this.inValidLogin=true;
    })
  }
}