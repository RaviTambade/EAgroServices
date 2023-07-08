import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Merchantrevenue } from '../Models/merchantrevenue';
import { Merchantsellviewmodel } from '../Models/Merchant-sell-viewmodel';
import { Merchant } from '../Models/merchant';
import { Merchantordercount } from '../Models/merchantordercount';
import { Collectionsell } from '../Models/collectionsell';

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

  getMerchantHistory(merchantId:any):Observable<Merchantsellviewmodel[]>{
    let url ="http://localhost:5182/api/sells/get-merchant-sells/" +merchantId;
    return this.httpClient.get<Merchantsellviewmodel[]>(url);
  }

  getMerchantRevenue(merchantId:any):Observable<Merchantrevenue[]>{
    let url="http://localhost:5182/api/sells/get-merchant-revenue/" +merchantId;
    return this.httpClient.get<Merchantrevenue[]>(url);
  }
  deleteMerchant(merchantId:any):Observable<any>{
    let url=" http://localhost:5188/api/merchants/delete/" +merchantId;
    return this.httpClient.delete<Merchant>(url);
  }

  getTotalPurchaseAmount(merchantId:any):Observable<any>{
    let url="  http://localhost:5182/api/sells/get-total-purchase-amount-merchant/" +merchantId;
    return this.httpClient.get<number>(url);
  }
  getTotalPurchaseOrderCount(merchantId:any):Observable<any>{
    let url="http://localhost:5182/api/sells/get-total-purchase-orders-count/" +merchantId;
    return this.httpClient.get<Merchantordercount>(url);
    }
    collectionSellBilling(collectionSell:Collectionsell):Observable<any>{
    let url="http://localhost:5182/api/sells";
    console.log(collectionSell.freightRate);
    console.log(collectionSell.sell);
    return this.httpClient.post<any>(url,collectionSell);  
    }
}