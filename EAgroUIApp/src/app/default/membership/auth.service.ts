import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { User } from './user';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  
  constructor(private httpClient:HttpClient) { }
  logIn(form:any):Observable<any>{
      let url ="http://localhost:5148/api/auth/authenticate/";
      return this.httpClient.post<User>(url,form);
      }
}
