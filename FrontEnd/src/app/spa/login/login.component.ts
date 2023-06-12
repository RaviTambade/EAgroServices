import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
message: string |undefined;

constructor(public svc:AuthService){}

login(username: string, password: string): boolean {
  this.message = '';
  if (this.svc.login(username, password)) {
    this.message = 'correct credential';
  }
  return false;
}

logout(): boolean {
  this.svc.logout();
  return false;
}
}