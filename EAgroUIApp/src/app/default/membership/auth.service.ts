import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { User } from './user';
import { Observable } from 'rxjs';
import { Insertfarmerrequest } from './insertfarmerrequest';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  
  constructor(private httpClient:HttpClient) { }
  logIn(form:any):Observable<any>{
      let url ="http://localhost:5148/api/auth/authenticate/";
      return this.httpClient.post<User>(url,form);
      }
  
  registerFarmer(insertfarmerrequest:Insertfarmerrequest):Observable<any>{
    let url =" http://localhost:5141/api/farmers/insert";
    return this.httpClient.post<Insertfarmerrequest>(url,insertfarmerrequest);
  }

  // registerMerchant(form:any):Observable<any>{
  //   let url =" http://localhost:5188/api/merchants/insert";
  //   return this.httpClient.post<Object>(url,form);
  // }
}
