import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Address } from '../vendors/address';

@Injectable({
  providedIn: 'root'
})
export class AddressService {
districts:any[];
  constructor(private httpClient:HttpClient) {
    this.districts=[]
   }

  getSelectedFarmers(address:Address):Observable<any>{
    let url="http://localhost:5141/api/farmers/byaddress"
    return this.httpClient.post<any>(url,address)
  }

  getStates():Observable<any>{
    let url=" http://localhost:5176/api/addresses/states"
    return this.httpClient.get<any>(url)
  }

  getDistricts(state:string):Observable<any>{
    let url=" http://localhost:5176/api/addresses/getdistricts/" +state
    return this.httpClient.get<any>(url)
  }
  getTahsils(district:string):Observable<any>{
    let url=" http://localhost:5176/api/addresses/gettahsils/" +district
    return this.httpClient.get<any>(url)
  }
  getVillages(tahsil:string):Observable<any>{
    let url=" http://localhost:5176/api/addresses/getvillages/" +tahsil
    return this.httpClient.get<any>(url)
  }
}
