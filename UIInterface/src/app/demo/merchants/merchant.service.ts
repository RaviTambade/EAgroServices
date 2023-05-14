import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Farmer } from '../farmers/farmer';
import { Merchant } from '../pages/authentication/merchant';
import { Sellviewmodel } from './sellviewmodel';

@Injectable({
  providedIn: 'root'
})
export class MerchantService {

  constructor(private httpClient:HttpClient) { }

  getMerchant(merchantId:any):Observable<any>{
    let url=" http://localhost:5188/api/merchants/getdetails/" +merchantId;
    return this.httpClient.get<Merchant>(url);
  }

  updateMerchant(merchantId:any,merchant:Merchant):Observable<any>{
    let url =" http://localhost:5188/api/merchants/update/" +merchantId;
    return this.httpClient.put<Merchant>(url,merchant);
  }

  getMerchantHistory(merchantId:any):Observable<any>{
    let url ="http://localhost:5182/api/sells/getmerchantsells/" +merchantId;
    return this.httpClient.get<Sellviewmodel>(url);
  }
}
