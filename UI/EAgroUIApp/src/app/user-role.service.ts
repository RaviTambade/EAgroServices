import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserRoleService {

  constructor(private http: HttpClient) { }

  getFarmersIds(): Observable<string> {
    let url = "http://localhost:5031/api/userroles/farmersid"
    return this.http.get<string[0]>(url)
  }

  getRolesOfUser(userId: number): Observable<string[]> {
    let url = "http://localhost:5031/api/userroles/roles/ " + userId;
    return this.http.get<string[]>(url);
  }
}
