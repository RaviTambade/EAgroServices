import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserRole } from '../Models/user-role';
import { UserDetails } from '../Models/user-details';

@Injectable({
  providedIn: 'root'
})
export class MembershipService {

  constructor(private svc: HttpClient) { }


  getUserByContact(contactNumber: string): Observable<UserDetails> {
    let url = "http://localhost:5102/api/users/contact/" + contactNumber;
    return this.svc.get<any>(url);
  }

  AddUserWithRole(userRole :UserRole) :Observable <boolean>{
    let url = "http://localhost:5031/api/userroles";
    return this.svc.post<boolean>(url, userRole);
  }
}
