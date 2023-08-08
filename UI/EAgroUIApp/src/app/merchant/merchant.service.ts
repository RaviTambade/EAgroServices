import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Merchant } from './merchant';
import { Collectioncount } from './collectioncount';
import { Corporate } from '../corporate';
import { Cropcount } from './cropcount';

@Injectable({
  providedIn: 'root'
})
export class MerchantService {

  constructor(private http: HttpClient) { }

  getmerchantIdByUserId(userId: number): Observable<number> {
    let url = "http://localhost:5276/api/merchants/manager/ " + userId;
    return this.http.get<number>(url);
  }

  getMerchantCorporateId(): Observable<any> {
    const merchantId = localStorage.getItem("merchantId");
    let url = "http://localhost:5276/api/merchants/" + merchantId + "/getcorporate"
    return this.http.get<any>(url)
  }

  addMerchant(merchant: Merchant): Observable<boolean> {
    let url = "http://localhost:5276/api/merchants";
    return this.http.post<any>(url, merchant)
  }
  getIdOfMerchant(corporateId: number): Observable<number> {
    let url = "http://localhost:5276/api/merchants/id/" + corporateId
    return this.http.get<number>(url)
  }
  getCollectionCount(merchantId:number):Observable<Collectioncount[]>{
    let url="http://localhost:5067/api/shipments/" + merchantId +"/collectioncount"
    return this.http.get<Collectioncount[]>(url)
  }

  getMerchantAndCorporateId(): Observable<Corporate[]> {
    let url = "http://localhost:5276/api/merchants/merchantandcorporateid"
    return this.http.get<any>(url)
  }
  getCropCount(merchantId:number):Observable<Cropcount[]>{
    let url="http://localhost:5067/api/shipments/" + merchantId +"/cropcount"
    return this.http.get<Cropcount[]>(url)
  }
}
