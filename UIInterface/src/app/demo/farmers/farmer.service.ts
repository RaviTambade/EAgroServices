import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Farmer } from './farmer';
import { Farmersell } from './farmersell';

@Injectable({
  providedIn: 'root'
})
export class FarmerService {
  constructor(private httpClient:HttpClient) { }
  getFarmer(farmerId:number):Observable<any>{
    let url =" http://localhost:5141/api/farmers/getdetails/" +farmerId;
    return this.httpClient.get<Farmer>(url);
  }
  getFarmerRevenue(farmerId:number):Observable<any>{
    let url =" http://localhost:5171/api/purchase/farmerselltotalamountbymonth/" +farmerId;
    return this.httpClient.get<Farmersell[]>(url);
  }
}
