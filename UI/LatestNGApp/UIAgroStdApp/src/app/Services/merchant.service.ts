import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Corporate } from '../Models/corporate';

@Injectable({
  providedIn: 'root'
})
export class MerchantService {

  constructor(private http: HttpClient) { }

  getmerchantIdByUserId(userId: number): Observable<number> {
    let url = "http://localhost:5276/api/merchants/manager/ " + userId;
    return this.http.get<number>(url);
  }

  getMerchantCorporateId(): Observable<Corporate[]> {
    const merchantId = localStorage.getItem("userId");
    let url = "http://localhost:5276/api/merchants/" + merchantId + "/getcorporate"
    return this.http.get<Corporate[]>(url)
  }

  getMerchantCorporatesId(): Observable<number> {
    const merchantId = localStorage.getItem("userId");
    let url = "http://localhost:5276/api/merchants/" + merchantId + "/getcorporate"
    return this.http.get<number>(url)
  }

  getCorporateIdOfTransporter(transporterId:number): Observable<number> {
    let url = "http://localhost:5025/api/transporters/corporateid/" + transporterId;
    return this.http.get<number>(url);
  }
  getIdOfMerchant(corporateId: number): Observable<number> {
    let url = "http://localhost:5276/api/merchants/id/" + corporateId
    return this.http.get<number>(url)
  }
}
