import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders,HttpErrorResponse} from '@angular/common/http';
import { User } from './user';
import { Userfarmerrole } from './userfarmerrole';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient:HttpClient) { }
  logIn(user:User):Observable<any>{
    let url ="http://localhost:5148/api/auth/authenticate/";
      return this.httpClient.post<User>(url,user);
      }

      registerFarmer(insertfarmer:Userfarmerrole):Observable<any>{
        let url =" http://localhost:5141/api/farmers/insert";
        return this.httpClient.post<Userfarmerrole>(url,insertfarmer);
      }
    
}
