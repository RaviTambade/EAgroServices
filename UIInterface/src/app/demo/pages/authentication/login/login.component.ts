import { Component, Input, NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../auth.service';
import { FormsModule } from '@angular/forms';
import { NgModel} from '@angular/forms';
import { User } from '../user';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule,FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export default class LoginComponent implements OnInit {
  inValidLogin:boolean ;
 @Input() user: User= {
   contactNumber: '', password: '', token: '',
   Id: 0
 };
  constructor(private svc :AuthService){}
  ngOnInit(): void {}

  logIn(){
    this.svc.logIn(this.user).subscribe(response=>{
      this.user.token=response.token;
      localStorage.setItem('jwt',this.user.token);
      this.inValidLogin=false;
    },
    (err)=>{
      err.this.inValidLogin=true;
    })
  }
}
