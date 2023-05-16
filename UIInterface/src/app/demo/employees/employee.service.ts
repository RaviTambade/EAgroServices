import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Farmer } from '../farmers/farmer';
import { FarmerDeleteComponent } from './farmers-list/farmer-delete/farmer-delete.component';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  constructor(private httpClient:HttpClient) { }
  getAllFarmers():Observable<any>{
    let url =" http://localhost:5141/api/farmers/getallfarmers";
    return this.httpClient.get<any>(url);
  }
  updateFarmer(farmerId:any,farmer:Farmer):Observable<any>{
    let url =" http://localhost:5141/api/farmers/update/" +farmerId;
    return this.httpClient.put<Farmer>(url,farmer);
  }
}

