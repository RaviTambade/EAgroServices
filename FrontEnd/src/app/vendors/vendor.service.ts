import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Vehicle } from './vehicle';
import { Vendor } from './vendor';

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
addVehicle(vendorId:any,vehicle:Vehicle):Observable<any>{
  let url="http://localhost:5240/api/vehicles/" +vendorId
  return this.httpClient.post<any>(url,vehicle);
 }
updateVendor(vendorId:any,vendor: Vendor): Observable<any> {
  let url = "http://localhost:5240/api/vendors/" + vendorId;
  return this.httpClient.put<any>(url, vendor)
}
DeleteVendor(vendorId: number): Observable<any> {
  let url = "http://localhost:5240/api/vendors/" + vendorId;
  return this.httpClient.delete(url)
}
GetCollections():Observable<any>{
  let url="http://localhost:5031/api/collections"
  return this.httpClient.get<any>(url)
}
}
