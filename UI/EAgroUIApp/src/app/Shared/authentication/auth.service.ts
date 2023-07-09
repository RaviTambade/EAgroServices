import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Credential } from './credential';
import { UpdatePassword } from './update-password';
import { UpdateContact } from './update-contact';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private svc: HttpClient) { }

  validate(credential: Credential): Observable<any> {
    let url = "http://localhost:5077/api/authentication/signin";
    return this.svc.post<any>(url, credential);
  }

  register(credential: Credential): Observable<boolean> {

    let url = "http://localhost:5077/api/authentication/register";
    return this.svc.post<any>(url, credential);
  }

  updatePassword(credential: UpdatePassword): Observable<boolean> {
    let url = "http://localhost:5077/api/authentication/update/password";
    const token = localStorage.getItem("jwt")
      const header = { "Authorization": "Bearer " + token }
    return this.svc.put<any>(url, credential,{headers:header});
  }

  updateContact(credential: UpdateContact): Observable<boolean> {
    let url = "http://localhost:5077/api/authentication/update/contactnumber";
    return this.svc.put<any>(url, credential);
  }
}
