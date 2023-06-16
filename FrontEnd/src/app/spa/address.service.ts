import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Address } from '../vendors/address';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  constructor(private httpClient:HttpClient) { }

  getSelectedFarmers(address:Address):Observable<any>{
    let url="http://localhost:5141/api/farmers/byaddress"
    return this.httpClient.post<any>(url,address)
  }
}
