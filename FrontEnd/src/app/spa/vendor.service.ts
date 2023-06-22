import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class VendorService {

  constructor(private httpClient:HttpClient) { }
  getVendors():Observable<any>{
   let url="http://localhost:5240/api/vendors"
   return this.httpClient.get<any>(url);
  }
  getVendor(transportId:number):Observable<any>{
    let url="http://localhost:5240/api/vendors/" +transportId;
    console.log(url);
    return this.httpClient.get<any>(url);
   }
   getVendorVehicles(id:any):Observable<any>{
    let url="http://localhost:5240/api/vendors/"+ id +"/vehicles";
    console.log(url);
    return this.httpClient.get<any>(url,id)
  }
  getSellTransport(id:any):Observable<any>{
    let url="http://localhost:5240/api/vendors/"+ id +"/sell";
    console.log(url);
    return this.httpClient.get<any>(url,id)
  }
}
