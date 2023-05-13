import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Farmer } from '../farmers/farmer';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  constructor(private httpClient:HttpClient) { }
  getAllFarmers():Observable<any>{
    let url =" http://localhost:5141/api/farmers/getallfarmers";
    return this.httpClient.get<any>(url);
  
  }
}

