import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddressesService {

  constructor(private http:HttpClient) { }

  updateAddress(address:Location):Observable<any>{
    let url ="http://localhost:5102/api/addresses/";
    return this.http.put<any>(url,address);
  }

  addAddress(address:Location):Observable<any>{
    let url ="http://localhost:5102/api/addresses/";
    return this.http.post<Location>(url,address);
  }
}
