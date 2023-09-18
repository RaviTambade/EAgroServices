import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../Models/user';
import { UserProfile } from '../Models/userprofile';
import { NameId } from '../Models/name-id';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient:HttpClient) { }

  
  getUserByContact(contactNumber: string): Observable<User> {
    let url = "http://localhost:5102/api/users/username/" + contactNumber;
    return this.httpClient.get<User>(url);
  }

  getUserRole(userId:number):Observable<string[]>{
    let url="http://localhost:5031/api/userroles/roles/" + userId;
    return this.httpClient.get<string[]>(url);
  }

  getUser(): Observable<any> {
    const userId=localStorage.getItem("userId");
    let url = "http://localhost:5102/api/users/" + userId
    return this.httpClient.get<any>(url)
  }
  getUserNamesWithId(userId: string): Observable<NameId[]> {
    let url = "http://localhost:5102/api/users/name/" + userId;
    return this.httpClient.get<NameId[]>(url)
  }
  
  updateUser(id: number, user: UserProfile): Observable<any> {
    let url = "http://localhost:5102/api/users/" + id
    return this.httpClient.put<any>(url, user)
  }

}
