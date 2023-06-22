import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../vendors/user';
import { JwtHelperService } from '@auth0/angular-jwt';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient:HttpClient, private jwtHelper: JwtHelperService) { }
  logIn(user:User):Observable<any>{
    console.log("inside request")
    let url ="http://localhost:5148/api/auth";
      return this.httpClient.post<User>(url,user);
      }

      getRoleFromToken(): string {
        const token = localStorage.getItem('jwtToken');
        if (token) {
          const decodedToken: any = this.jwtHelper.decodeToken(token)
          return decodedToken.role;
        }
        return '';
      }

      getUserIdFromToken(): number {
        const token:any = localStorage.getItem('jwtToken');
        const decodedToken: any = this.jwtHelper.decodeToken(token)
        return decodedToken.userId;
      }
}

