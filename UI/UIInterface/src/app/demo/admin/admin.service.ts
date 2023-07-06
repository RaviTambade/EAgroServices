import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Admin } from './admin';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private httpClient:HttpClient) { }
  getAdmin(adminId:number):Observable<any>{
  let url = "http://localhost:5051/api/admins/getbyid/" +adminId;
  return this.httpClient.get<any>(url);

  }
  updateAdmin(adminId:number,admin:Admin):Observable<any>{
    let url = "http://localhost:5051/api/admins/update/" +adminId;
    return this.httpClient.put<any>(url,admin);
  
    }
}


