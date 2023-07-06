import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Addresses } from '../addresses';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddressesService {

  constructor(private http:HttpClient) { }

  updateAddress(address:Addresses):Observable<any>{
    let url ="http://localhost:5102/api/addresses/";
    return this.http.put<any>(url,address);
  }

  addAddress(address:Addresses):Observable<any>{
    let url ="http://localhost:5102/api/addresses/";
    return this.http.post<Addresses>(url,address);
  }
}
