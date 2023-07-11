import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Location } from './location';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(private http:HttpClient) {}

  updateAddress(address:Location):Observable<any>{
    let url ="http://localhost:5102/api/location/";
    return this.http.put<any>(url,address);
  }

  addAddress(address:Location):Observable<any>{
    let url ="http://localhost:5102/api/location/";
    return this.http.post<Location>(url,address);
  }
}
