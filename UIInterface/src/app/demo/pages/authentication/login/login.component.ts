import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../auth.service';
import { User } from '../user';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export default class LoginComponent implements OnInit {
  constructor(private svc :AuthService){}
  ngOnInit(): void {}


  logIn(user:User){
    this.svc.logIn(user).subscribe(response=>{
      const token=response.token;
      localStorage.setItem('jwt',token);
    })
  }
}
