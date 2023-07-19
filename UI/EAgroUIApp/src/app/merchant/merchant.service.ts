import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Merchant } from './merchant';

@Injectable({
  providedIn: 'root'
})
export class MerchantService {

  constructor(private http: HttpClient) { }

   getMerchantCorporateId(): Observable<any> {
    const merchantId = localStorage.getItem("merchantId");
    let url = "http://localhost:5276/api/merchants/" + merchantId + "/getcorporate"
    return this.http.get<any>(url)
  }

  addMerchant(merchant :Merchant):Observable<boolean>{
    let url = "http://localhost:5276/api/merchants";
    return this.http.post<any>(url,merchant)
  }
}
