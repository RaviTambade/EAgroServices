import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
user:any=[
  {
  'username':'shubham',
  'password':'password'
},
{
  'username':'shubham',
  'password':'password'
},
{
  'username':'shubham',
  'password':'password'
}
]
login(username:string,password:string):boolean{
  console.log()
  if (this.user.username === username && this.user.password === password) {
    localStorage.setItem('username', username);
    return true;
  }
  return false;
}

logout(): any { localStorage.removeItem('username'); }

getUser(): any { 
  return localStorage.getItem('username'); 
}
isLoggedIn(): boolean { return this.getUser() !== null;}
}

  

