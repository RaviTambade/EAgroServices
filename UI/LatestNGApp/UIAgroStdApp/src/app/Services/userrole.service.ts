import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../Models/user';
import { NameId } from '../Models/name-id';
import { Userdetails } from '../Models/userdetails';

@Injectable({
  providedIn: 'root'
})
export class UserroleService {

  constructor(private http: HttpClient) { }

  getusersId(role:string): Observable<string> {
    let url = "http://localhost:5142/api/Users/roles/"+role
    return this.http.get<string[0]>(url)
  }
  getusers(role:string): Observable<Userdetails[]> {
    let url = "http://localhost:5142/api/Users/by/"+role 
    return this.http.get<Userdetails[]>(url)
    
  }

  getRolesOfUser(userId: number): Observable<string[]> {
    let url = "http://localhost:5031/api/userroles/roles/ " + userId;
    return this.http.get<string[]>(url);
  }
  getMerchantIds():Observable<string>{
    let url="http://localhost:5031/api/userroles/merchantsId"
    return this.http.get<string[0]>(url)
  }
}
