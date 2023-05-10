import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders,HttpErrorResponse} from '@angular/common/http';
import { User } from './user';
import { Userfarmerrole } from './userfarmerrole';
import { Observable } from 'rxjs';
import { Usermerchantrole } from './usermerchantrole';
import { Useremployeerole } from './useremployeerole';
import { Usertransportrole } from './usertransportrole';
import { Useradminrole } from './useradminrole';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient:HttpClient) { }
  logIn(user:User):Observable<any>{
    console.log("inside request")
    let url ="http://localhost:5148/api/auth/authenticate/";
      return this.httpClient.post<User>(url,user);
      }

      registerFarmer(insertfarmer:Userfarmerrole):Observable<any>{
        let url =" http://localhost:5141/api/farmers/insert";
        return this.httpClient.post<Userfarmerrole>(url,insertfarmer);
      }
    registerMerchant(insertmerchant:Usermerchantrole):Observable<any>{
      let url = "http://localhost:5188/api/merchants/insert";
      return this.httpClient.post<Usermerchantrole>(url,insertmerchant);
    }
    registerEmployee(insertemployee:Useremployeerole):Observable<any>{
      let url = "http://localhost:5265/api/employees/insert";
      return this.httpClient.post<Useremployeerole>(url,insertemployee);
    }
    registerTransport(inserttransport:Usertransportrole):Observable<any>{
      let url = "http://localhost:5240/api/transports/insert";
      return this.httpClient.post<Usertransportrole>(url,inserttransport);
    }
    registerAdmin(insertadmin:Useradminrole):Observable<any>{
      let url = "http://localhost:5051/api/admins/insert";
      return this.httpClient.post<Useradminrole>(url,insertadmin);
    }
    
}
