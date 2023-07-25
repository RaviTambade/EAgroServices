import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserRoleService {

  constructor(private http: HttpClient) { }

  getusersId(role:string): Observable<string> {
    let url = "http://localhost:5031/api/userroles/usersid/"+role
    return this.http.get<string[0]>(url)
  }

  getRolesOfUser(userId: number): Observable<string[]> {
    let url = "http://localhost:5031/api/userroles/roles/ " + userId;
    return this.http.get<string[]>(url);
  }
}
