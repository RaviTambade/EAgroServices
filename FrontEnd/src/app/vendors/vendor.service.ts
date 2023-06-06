import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VendorService {

  constructor(private httpClient:HttpClient) { }
getVendors():Observable<any>{
 let url="http://localhost:5240/api/vendors"
 return this.httpClient.get<any>(url);
}
getVendorVehicles(id:any):Observable<any>{
  let url="http://localhost:5240/api/vendors/"+ id +"/vehicles"
  return this.httpClient.get<any>(url,id)
}
}
