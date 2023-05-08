import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders,HttpErrorResponse} from '@angular/common/http';
import { User } from './user';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient:HttpClient) { }
  logIn(user:User){
      const headers=new HttpHeaders({'Content-Type':'application/json'});
      let url ="http://localhost:5148/api/auth/authentication/"+user;
      return this.httpClient.post<User>(url,user,{headers});
      }
}
