import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './user';
import { Observable, Subject } from 'rxjs';
import { NameId } from 'src/app/name-id';



@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  getUserNamesWithId(userId: string): Observable<NameId[]> {
    let url = "http://localhost:5102/api/users/name/" + userId;
    return this.httpClient.get<NameId[]>(url)
  }


  addUser(user: User): Observable<any> {
    let url = "http://localhost:5102/api/users"
    return this.httpClient.post<any>(url, user)
  }

  updateUser(id: number, user: User): Observable<any> {
    let url = "http://localhost:5102/api/users/updateuser/" + id
    return this.httpClient.put<any>(url, user)
  }

  getUser(id: number): Observable<any> {
    let url = "http://localhost:5102/api/users/" + id
    return this.httpClient.get<any>(url)
  }

  getallUser(): Observable<any> {
    let url = "http://localhost:5102/api/users/getall"
    return this.httpClient.get<any[]>(url);
  }

  removeUser(userId: number): Observable<any> {
    let url = "http://localhost:5102/api/users/" + userId
    return this.httpClient.delete<any>(url)
  }
}
