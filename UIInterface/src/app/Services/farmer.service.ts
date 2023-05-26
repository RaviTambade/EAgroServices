import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Farmer } from '../Models/farmer';
import { Farmersell } from '../Models/farmersell';
import { Purchaseviewmodel } from '../Models/purchaseviewmodel';
import { Farmersellvariety } from '../Models/farmersellvariety';
import { Farmerorderscount } from '../Models/farmer-orders-count';


@Injectable({
  providedIn: 'root'
})
export class FarmerService {
  constructor(private httpClient:HttpClient) { }
  getFarmer(farmerId:string):Observable<any>{
    let url ="http://localhost:5141/api/farmer/" +farmerId;
    return this.httpClient.get<Farmer>(url);
  }
  deleteFarmer(farmerId:any):Observable<any>{ 
    let url = "http://localhost:5141/api/farmers/delete/"+farmerId;
    return this.httpClient.delete<any>(url);
  }
  getFarmerRevenue(farmerId:string):Observable<any>{  //column chart
    let url =" http://localhost:5171/api/purchase/farmer-sell-total-amount-by-month/" +farmerId;
    return this.httpClient.get<Farmersell[]>(url);
  }
  updateFarmerDetails(farmerId:any,farmer:Farmer):Observable<any>{
    let url =" http://localhost:5141/api/farmer/" +farmerId;
    return this.httpClient.put<Farmer>(url,farmer);
  }
  getFarmerPurchaseDetails(farmerId:any):Observable<Purchaseviewmodel[]>{  
    let url =" http://localhost:5171/api/purchase/farmer-purchase-details/" +farmerId;
    return this.httpClient.get<Purchaseviewmodel[]>(url);
  }
  
  getFarmerTotalAmont(farmerId:any):Observable<any>{ //totalAmount card
    let url = "http://localhost:5171/api/purchase/farmer-sell-total-amount/"+farmerId;
    return this.httpClient.get<number>(url);
  }

  getFarmerSellByVariety(farmerId:any):Observable<any>{  //pie chart
    let url = "http://localhost:5171/api/purchase/farmer-sell-by-variety/"+farmerId;
    return this.httpClient.get<Farmersellvariety[]>(url);
  }
  getFarmerOrdersPerMonth(farmerId:any):Observable<any>{ //area chart
    let url = "http://localhost:5171/api/purchase/farmer-orders-per-month/"+farmerId;
    return this.httpClient.get<Farmerorderscount[]>(url);
  }

}
